import { type Response, type Request, type NextFunction } from "express";

class ErrorHandler extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
}

export { errorMiddleware, ErrorHandler };
