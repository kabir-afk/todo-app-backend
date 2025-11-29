import { config } from "dotenv";
config();
export const env = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_URI: process.env.FRONTEND_URI,
    GMAIL_USER: process.env.GMAIL_API_USER,
    GMAIL_API_PASSWORD: process.env.GMAIL_API_PASS,
};
//# sourceMappingURL=env.js.map