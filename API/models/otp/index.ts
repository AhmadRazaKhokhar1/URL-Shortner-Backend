import { model, Schema } from "mongoose";

export const OtpSchema = new Schema({
  userId: {
    type: String,
  },
  otp: {
    type: Number,
  },
  expiresIn: {
    type: String,
  },
  isValid: {
    type: Boolean,
  },
});

export const OtpModel = model("OTP", OtpSchema);
