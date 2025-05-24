// Path
import path from "path";

// Utils
import { sendEmail } from "../../../utils";

// Models
import { UserModel } from "../../models";

// ejs
import ejs from "ejs";

export const AuthResolver = {
  Query: {},
  Mutatino: {
    passwordLessAuthentication: async (_, { name, email, profileImage }) => {
      try {
        // Creating a new Document
        const newUser = await UserModel.create({
          name,
          email,
          profileImage,
        });
        const new_otp = Math.floor(Math.random() * 5);
        const html = await ejs.renderFile(
          path.join(__dirname, "templates", "otp-email-template.ejs"),
          { name, otp: new_otp },
        );
        // Sending Email
        await sendEmail({ email, html, subject: "OTP Verification" });

        newUser.save();
      } catch (error) {}
    },
  },
};
