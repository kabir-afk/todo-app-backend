import { type Request } from "express";
export declare class ErrorLogger {
    static logError(error: Error, req: Request, statusCode?: number): Promise<void>;
    private static sanitizeData;
    static getRecentErrors(limit?: number): Promise<(import("mongoose").Document<unknown, {}, import("../models/errorLogs.js").IErrorLog, {}, import("mongoose").DefaultSchemaOptions> & import("../models/errorLogs.js").IErrorLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    static getErrorById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/errorLogs.js").IErrorLog, {}, import("mongoose").DefaultSchemaOptions> & import("../models/errorLogs.js").IErrorLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static getUnresolvedErrors(): Promise<(import("mongoose").Document<unknown, {}, import("../models/errorLogs.js").IErrorLog, {}, import("mongoose").DefaultSchemaOptions> & import("../models/errorLogs.js").IErrorLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    static markAsResolved(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/errorLogs.js").IErrorLog, {}, import("mongoose").DefaultSchemaOptions> & import("../models/errorLogs.js").IErrorLog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static getErrorStats(): Promise<{
        total: number;
        unresolved: number;
        last24Hours: number;
        by5xx: number;
        by4xx: number;
    }>;
}
//# sourceMappingURL=errorLogger.d.ts.map