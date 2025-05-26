import { Router } from "express";
import { RedirectToTinyUrlController } from "../../controllers/index.js";

const TinyUrlRouter = Router();

TinyUrlRouter.get(
  "/redirect-to-tiny-url",
  RedirectToTinyUrlController.redirectToTinyUrl,
);

export default TinyUrlRouter;
