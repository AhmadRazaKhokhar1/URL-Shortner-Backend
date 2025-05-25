// Express
import { Request } from "express";

// Interfaces
import { IJwtProps } from "../interfaces/jwt.js";

export const extractToken = (req: IJwtProps & Request): IJwtProps => {
  // 1. Check Authorization header (Mobile)
  const headerAccessToken = req.headers?.accessToken || req.headers?.accesstoken;
  const headerRefresh = req.headers?.refreshToken || req.headers?.refreshtoken;
  if (
    headerAccessToken &&
    headerRefresh &&
    String(headerAccessToken)?.startsWith("Bearer ") &&
    String(headerRefresh)?.startsWith("Bearer ")
  ) {
    return {
      accessToken: String(headerAccessToken)?.split(" ")[1],
      refreshToken: String(headerRefresh)?.split(" ")[1],
    };
  }

  // 2. Check cookies (Web)
  if (req.cookies?.access_token && req.cookies?.refresh_token) {
    return {
      accessToken: String(req.cookies?.access_token),
      refreshToken: String(req.cookies?.refresh_token),
    };
  }

  return {
    access_token:null,
    refresh_token:null
  };
};
