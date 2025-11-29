import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {} from "express";
import { env } from "../../config/env.js";
async function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.json({ success: false, Message: "You are not logged in" });
        const decoded = jwt.verify(token, env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded._id);
        next();
    }
    catch (error) {
        console.error("Missing token \n", error);
    }
}
export { isAuthenticated };
//# sourceMappingURL=auth.js.map