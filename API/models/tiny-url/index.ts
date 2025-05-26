import mongoose from "mongoose";
import { nanoid } from "nanoid";
const { model, models, Schema } = mongoose;
export const tinyUrlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      unique: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    clicksCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

tinyUrlSchema.pre("save", async function (next) {
  if (!this.shortUrl) {
    let unique = false;
    let newShortUrl = "";

    while (!unique) {
      newShortUrl = nanoid(7);
      const existing = await models?.TinyUrl?.findOne({
        shortUrl: newShortUrl,
      });
      if (!existing) {
        unique = true;
      }
    }

    this.shortUrl = newShortUrl;
  }

  next();
});

export const TinyUrlModel = model("TinyUrl", tinyUrlSchema);
