import { type Request } from "express";
import { ErrorLog } from "../models/errorLogs.js";

export class ErrorLogger {
  static async logError(error: Error, req: Request, statusCode: number = 500) {
    try {
      const sanitizedBody = this.sanitizeData(req.body);

      await ErrorLog.create({
        errorMessage: error.message,
        errorStack: error.stack,
        statusCode,
        method: req.method,
        url: req.originalUrl || req.url,
        userId: (req as any).user?.id || (req as any).user?._id, // If auth middleware adds user
        requestBody: sanitizedBody,
        requestParams: req.params,
        requestQuery: req.query,
        resolved: false,
      });

      console.error("Error logged to database:", {
        message: error.message,
        url: req.originalUrl,
        method: req.method,
      });
    } catch (loggingError) {
      console.error("Failed to log error to database:", loggingError);
      console.error("Original error:", error);
    }
  }

  private static sanitizeData(data: any): any {
    if (!data || typeof data !== "object") return data;

    const sensitiveFields = [
      "password",
      "token",
      "apiKey",
      "secret",
      "creditCard",
    ];
    const sanitized = { ...data };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = "[REDACTED]";
      }
    }

    return sanitized;
  }

  static async getRecentErrors(limit: number = 50) {
    return await ErrorLog.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .select("-errorStack");
  }

  static async getErrorById(id: string) {
    return await ErrorLog.findById(id);
  }

  static async getUnresolvedErrors() {
    return await ErrorLog.find({ resolved: false }).sort({ timestamp: -1 });
  }

  static async markAsResolved(id: string) {
    return await ErrorLog.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true }
    );
  }

  static async getErrorStats() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return {
      total: await ErrorLog.countDocuments(),
      unresolved: await ErrorLog.countDocuments({ resolved: false }),
      last24Hours: await ErrorLog.countDocuments({
        timestamp: { $gte: oneDayAgo },
      }),
      by5xx: await ErrorLog.countDocuments({
        statusCode: { $gte: 500, $lt: 600 },
      }),
      by4xx: await ErrorLog.countDocuments({
        statusCode: { $gte: 400, $lt: 500 },
      }),
    };
  }
}
