import { TinyUrlModel } from "../../models/tiny-url/index.js";

export const TinyUrlResolver = {
  Query: {
    getAllUrls: async (_, { userId }) => {
      try {
        if (!userId) {
          throw new Error("Unauthorized access");
        }
        const tinyUrls = await TinyUrlModel.find({
          userId,
        });
        console.log("🚀 ~ getAllUrls: ~ tinyUrls:", tinyUrls)
        return tinyUrls ?? [];
      } catch (error) {
        console.error(
          "An error occured while creating a new tiny url: ",
          error,
        );
        throw new Error(error);
      }
    },
  },
  Mutation: {
    makeTinyUrl: async (_, { input: { originalUrl, userId } }) => {
      try {
        console.log(originalUrl, userId);
        // Validation
        if (!originalUrl) {
          throw new Error("Url is a required field");
        }
        if (!userId) {
          throw new Error("Unauthorized access");
        }

        // Checking if it already exists
        const alreadyExists = await TinyUrlModel.findOne({
          originalUrl,
          userId,
        });

        if (alreadyExists?._id) {
          return alreadyExists;
        }

        // Else make a new one
        const newTinyUrl = new TinyUrlModel({
          originalUrl,
          userId,
        });
        await newTinyUrl.save();

        return newTinyUrl;
      } catch (error) {
        console.error(
          "An error occured while creating a new tiny url: ",
          error,
        );
        throw new Error(error);
      }
    },
  },
};
