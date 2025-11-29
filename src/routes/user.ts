import express from "express";
import {
  getAllUsers,
  register,
  getMyProfile,
  login,
  logout,
  sendPasswordResetOTP,
  resetPassword,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/me", isAuthenticated, getMyProfile);
router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.post("/forgot-password", sendPasswordResetOTP);
router.post("/reset-password", resetPassword);

export default router;
