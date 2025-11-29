import { type Response, type Request, type NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
declare function isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export { isAuthenticated };
//# sourceMappingURL=auth.d.ts.map