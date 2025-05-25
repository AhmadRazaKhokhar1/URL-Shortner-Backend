import { model, Schema } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    profileImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("User", userSchema);
