import jwt from "jsonwebtoken";
import { type Response } from "express";
import { env } from "../../config/env.js";

interface IUser {
  _id: string;
}

function sendCookie(res: Response, user: IUser, message: string) {
  const token = jwt.sign({ _id: user._id }, env.JWT_SECRET_KEY!);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
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
