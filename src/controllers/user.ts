import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { ErrorHandler } from "../middleware/error.js";
import { type Request, type Response, type NextFunction } from "express";
import { env } from "../../config/env.js";

async function getAllUsers(req: Request, res: Response) {
  const users = await User.find({});
  return res.json({
    users,
  });
}

function getMyProfile(req: Request, res: Response) {
  res.status(200).json({ success: true, user: req.user });
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password, req.body);
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler(404, "User Already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(res, user, "User Successfully Created");
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler(404, "Invalid email or password"));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler(404, "Invalid email or password"));

    sendCookie(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    next(error);
  }
}

async function logout(req: Request, res: Response) {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({ success: true, message: "Cookie deleted successfully" });
}

export { getAllUsers, register, getMyProfile, login, logout };
