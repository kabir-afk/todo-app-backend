import { config } from "dotenv";

config();

interface ENV {
  JWT_SECRET_KEY: string;
  MONGO_URI: string;
  PORT: string;
  NODE_ENV: string;
  FRONTEND_URI: string;
}

export const env: ENV = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
  MONGO_URI: process.env.MONGO_URI!,
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  FRONTEND_URI: process.env.FRONTEND_URI!,
};
