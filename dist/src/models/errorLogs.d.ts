import mongoose, { Document } from "mongoose";
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
export declare const ErrorLog: mongoose.Model<IErrorLog, {}, {}, {}, mongoose.Document<unknown, {}, IErrorLog, {}, mongoose.DefaultSchemaOptions> & IErrorLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IErrorLog>;
//# sourceMappingURL=errorLogs.d.ts.map