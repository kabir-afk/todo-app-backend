import express from "express";
import {
  getAllUsers,
  register,
  getMyProfile,
  login,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/me", isAuthenticated, getMyProfile);
router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);

export default router;
