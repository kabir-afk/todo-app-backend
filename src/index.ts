import { env } from "../config/env.js";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/todo.js";
import { isAuthenticated } from "./middleware/auth.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// CORS setup: allow the frontend origin(s). Use a dynamic whitelist so
// we can control allowed origins via environment variables.
// Include Vite's default dev origin so `http://localhost:5173` requests are allowed
const allowedOrigins = [
  env.FRONTEND_URI,
  "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps or curl/postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options("*", cors(corsOptions));
// Helpful runtime log to verify configured origins (visible in server logs)
console.log("CORS allowed origins:", allowedOrigins);

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", isAuthenticated, taskRoute);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(env.MONGO_URI, {
    dbName: "todo-app",
  })
  .then((c) => console.log(`MongoDB Connected with ${c.connection.host}`))
  .catch((error) => console.log("Error:", error));

app.listen(env.PORT, () =>
  console.log(
    `Server started at port number:${env.PORT} in ${env.NODE_ENV} mode`
  )
);
