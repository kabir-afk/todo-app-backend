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
app.use(
  cors({
    origin: [env.FRONTEND_URI],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", isAuthenticated, taskRoute);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(env.MONGO_URI)
  .then((c) => console.log(`MongoDB Connected with ${c.connection.host}`))
  .catch((error) => console.log("Error:", error));

app.listen(env.PORT, () =>
  console.log(
    `Server started at port number:${env.PORT} in ${env.NODE_ENV} mode`
  )
);
