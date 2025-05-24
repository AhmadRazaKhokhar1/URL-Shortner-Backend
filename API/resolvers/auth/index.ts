// Path
import path from "path";

// Utils
import { IPasswordLessAuthenticationMutationProps } from "../../../utils/interfaces/auth.js";

// Models
import { UserModel } from "../../models/index.js";

// ejs
import ejs from "ejs";
import { fileURLToPath } from "url";
import { AddToSendOtpEmailQueue } from "../../../utils/helpers/redis.js";

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AuthResolver = {
  Query: {},
  Mutation: {
    passwordLessAuthentication: async (
      _: any,
      {
        input: { name, email, profileImage },
      }: { input: IPasswordLessAuthenticationMutationProps },
    ) => {
      try {
        console.log("creating user", { name, email, profileImage });
        // Checking if the user already exists
        const alreadyExists = await UserModel.findOne({ email });

        console.log("🚀 ~ alreadyExists:", alreadyExists?._id)
        // Generating OTP
        const new_otp = Math.floor(Math.random() * 100000);
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
           await AddToSendOtpEmailQueue({
            email,
            html,
            subject: "OTP Verification",
          });
          return alreadyExists;
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
        console.log("🚀 ~ user:", user);
        return user;
      } catch (error) {
        console.error("An error occured while creating the user", error);
      }
    },
  },
};
