import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { type Response, type Request, type NextFunction } from "express";
import { env } from "../../config/env.js";

interface JwtPayload {
  _id: string;
}

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.json({ success: false, Message: "You are not logged in" });

    const decoded = jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload;

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    console.error("Missing token \n", error);
  }
}

export { isAuthenticated };
