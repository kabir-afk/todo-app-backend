import { type Request, type Response, type NextFunction } from "express";
declare function getAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function getMyProfile(req: Request, res: Response): void;
declare function register(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function login(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function logout(req: Request, res: Response): Promise<void>;
declare function sendPasswordResetOTP(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
declare function resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export { getAllUsers, register, getMyProfile, login, logout, sendPasswordResetOTP, resetPassword, };
//# sourceMappingURL=user.d.ts.map