import mongoose, { Schema, Document } from "mongoose";

export interface IErrorLog extends Document {
  timestamp: Date;
  errorMessage: string;
  errorStack?: string;
  statusCode: number;
  method: string;
  url: string;
  userId?: string;
  requestBody?: any;
  requestParams?: any;
  requestQuery?: any;
  resolved: boolean;
}

const ErrorLogSchema = new Schema<IErrorLog>(
  {
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    errorMessage: {
      type: String,
      required: true,
    },
    errorStack: {
      type: String,
    },
    statusCode: {
      type: Number,
      required: true,
      index: true,
    },
    method: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      index: true,
    },
    requestBody: {
      type: Schema.Types.Mixed,
    },
    requestParams: {
      type: Schema.Types.Mixed,
    },
    requestQuery: {
      type: Schema.Types.Mixed,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
ErrorLogSchema.index({ timestamp: -1, statusCode: 1 });
ErrorLogSchema.index({ resolved: 1, timestamp: -1 });

export const ErrorLog = mongoose.model<IErrorLog>("ErrorLog", ErrorLogSchema);
