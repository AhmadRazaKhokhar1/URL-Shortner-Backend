// Express
import { NextFunction, Request, Response } from "express";

// Helpers
import { extractToken } from "../../utils/helpers/jwt.js";

// JWT
import jwt from "jsonwebtoken";

// Dotenv
import { configDotenv } from "dotenv";
configDotenv();

export function AuthMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { refreshToken, accessToken } = extractToken(req);
  try {
    // Env Vars
    const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET;
    const jwt_secret = process.env.JWT_SECRET;
    // Validation
    if (!refreshToken || !accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    if (!jwt_secret || !jwt_refresh_secret) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error: Auth",
      });
    }

    if (!refreshToken || !accessToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }
    try {
      const payload = jwt.verify(accessToken, jwt_secret);
      (req as any).userId = payload;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        const decodedRefresh = jwt.verify(refreshToken, jwt_refresh_secret);
        const parsedRefresh = decodedRefresh as { userId: string };

        // Generating new tokens
        const newAccessToken = jwt.sign(
          { userId: parsedRefresh.userId },
          jwt_secret,
          { expiresIn: "15m" },
        );
        const newRefreshToken = jwt.sign(
          { userId: parsedRefresh.userId },
          jwt_refresh_secret,
          { expiresIn: "120d" },
        );

        // Setting for web
        res.cookie("refresh_token", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 120 * 24 * 60 * 60 * 1000,
        });

        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        // Setting for mobile
        req.headers.accessToken = newAccessToken;
        req.headers.refreshToken = newRefreshToken;

        (req as any).user = decodedRefresh;
        return next();
      }
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "Access token invalid",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
