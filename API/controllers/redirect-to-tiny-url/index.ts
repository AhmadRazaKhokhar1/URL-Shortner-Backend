import { Request, Response } from "express";
import { TinyUrlModel } from "../../models/tiny-url/index.js";

export const RedirectToTinyUrlController = {
  redirectToTinyUrl: async (req: Request, res: Response) => {
    try {
      const { shortUrl } = req.query;
      const urlObj = await TinyUrlModel.findOne({ shortUrl });
      if (urlObj?._id) {
        urlObj.clicksCount += 1;
        await urlObj.save();
        return res.status(200).json(urlObj);
      } else {
        return res.status(404).json({
          success: false,
          message: "The URL was not found",
        });
      }
    } catch (error) {
      console.error(
        "error occured while getting the tiny redirection url:",
        error,
      );
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};
