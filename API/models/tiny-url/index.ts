import { model, models, Schema } from "mongoose";
import { nanoid } from "nanoid";

export const tinyUrlSchema = new Schema(
  {
    originalUrl: {
      required: true,
      type: String,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
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
      const existing = await models?.TinyUrl?.findOne({ shortUrl: newShortUrl });
      if (!existing) {
        unique = true;
      }
    }

    this.shortUrl = newShortUrl;
  }

  next();
});

export const TinyUrlModel = model("TinyUrl", tinyUrlSchema);
