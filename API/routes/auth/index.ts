// Express
import { Router } from "express";

// Controllers
import { AuthController } from "../../controllers/index.js";

// Router
const AuthRouter = Router();

// Methods
AuthRouter.post(
  "/password-less-entry",
  AuthController.passwordLessAuthentication,
);
AuthRouter.post("/otp-verification", AuthController.verifyOTP);

export default AuthRouter