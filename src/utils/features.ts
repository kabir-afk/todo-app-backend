import jwt from "jsonwebtoken";
import { type Response } from "express";
import { env } from "../../config/env.js";
import { type ObjectId } from "mongoose";

interface IUser {
  _id: string | ObjectId;
}

function sendCookie(res: Response, user: IUser, message: string) {
  const userId = typeof user._id === "string" ? user._id : user._id.toString();
  const token = jwt.sign({ _id: userId }, env.JWT_SECRET_KEY!);

  res
    .status(201)
    .cookie("token", token, {
      maxAge: 15 * 60 * 1000,
      sameSite: env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({
      success: true,
      message: message,
    });
}

export { sendCookie };
