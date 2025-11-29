import mongoose, {} from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map