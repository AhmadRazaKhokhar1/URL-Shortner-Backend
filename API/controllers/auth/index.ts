// EJS
import ejs from "ejs";

// Path & URL
import path from "path";
import { fileURLToPath } from "url";

// Utils
import { AddToSendOtpEmailQueue } from "../../../utils/helpers/redis.js";
import {
  IBodyOTPArgs,
  IPasswordLessAuthenticationMutationProps,
} from "../../../utils/index.js";

// Express
import { Request, Response } from "express";

// Models
import { OtpModel, UserModel } from "../../models/index.js";

// JWT
import jwt from "jsonwebtoken";

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AuthController = {
  passwordLessAuthentication: async (req: Request, res: Response) => {
    try {
      const { name, email, profileImage } =
        req.body as IPasswordLessAuthenticationMutationProps;

      // Validation
      if (!email) {
        return res.status(406).json({
          success: false,
          message: "Email is a required property",
        });
      }
      if (!name) {
        return res.status(406).json({
          success: false,
          message: "Name is a required property",
        });
      }
      // Checking if the user already exists
      const alreadyExists = await UserModel.findOne({ email });

      // Generating OTP
      const new_otp = Math.floor(100000 + Math.random() * 900000);

      // Path to the email temp
      const templatePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "utils",
        "templates",
        "index.ejs",
      );
      const html = await ejs.renderFile(templatePath, { name, otp: new_otp });

      // 1. If the user already exists, simply sending him/her the OTP
      if (alreadyExists) {
        await OtpModel.deleteMany({ userId: alreadyExists?._id });
        const otpObj = new OtpModel({
          otp: new_otp,
          expiresIn: new Date().getTime() + 5 * 60 * 1000,
          userId: alreadyExists?._id,
          isValid: false,
        });
        await AddToSendOtpEmailQueue({
          email,
          html,
          subject: "OTP Verification",
        });
        await otpObj.save();
        return res.status(200).json(alreadyExists);
      }

      // 2. Else creating a new document in DB
      // Creating a new Document
      const newUser = new UserModel({
        name,
        email,
        profileImage,
      });

      // Sending Email
      await AddToSendOtpEmailQueue({
        email,
        html,
        subject: "OTP Verification",
      });

      const user = await newUser.save();

      // Deleting Prev Tokens & Saving OTP
      await OtpModel.deleteMany({ userId: user?._id });
      const otpObj = new OtpModel({
        otp: new_otp,
        expiresIn: new Date().getTime() + 5 * 60 * 1000,
        userId: user?._id,
        isValid: false,
      });
      await otpObj.save();

      return res.status(201).json(user);
    } catch (error) {
      console.error("An error occured while creating the user", error);
    }
  },
  verifyOTP: async (req: Request, res: Response) => {
    try {
      const { otp, userId } = req.body as unknown as IBodyOTPArgs;

      if (!otp || !userId) {
        return res.status(404).json({
          success: false,
          message: "Args not found",
        });
      }

      // Body Args
      const OTP = await OtpModel.findOne({ userId });
      const user = await UserModel.findOne({ _id: userId });

      // Validating
      if (!OTP) {
        return res.status(401).json({
          success: false,
          message: "Your OTP has been expired",
        });
      }
      if (Number(OTP.expiresIn) < new Date().getTime()) {
        return res.status(401).json({
          success: false,
          message: "Your OTP has been expired",
        });
      }
      if (Number(OTP.otp) !== Number(otp)) {
        return res.status(401).json({
          success: false,
          message: "Invalid OTP",
        });
      }
      if (OTP.otp === otp) {
        const accessToken = jwt.sign(
          { userId: user?._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "15min",
          },
        );
        const refreshToken = jwt.sign(
          { userId: user?._id },
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: "120d",
          },
        );
        // Setting cookies for web this will only work in production
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
          path: "/",
          sameSite:"none",
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 120 * 24 * 60 * 60 * 1000,
          path: "/",
          sameSite:"none",
        });

        // Setting headers for mobile
        req.headers.accessToken = accessToken;
        req.headers.refreshToken = refreshToken;
        await OtpModel.deleteMany({ userId });
        return res.status(200).json({
          success: true,
          message: "Logged in successfully",
          accessToken,
          refreshToken
        });
      }
    } catch (error) {
      console.error("error occured while verifying otp:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};
