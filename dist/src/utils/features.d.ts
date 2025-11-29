import { type Response } from "express";
import { type ObjectId } from "mongoose";
interface IUser {
    _id: string | ObjectId;
}
declare function sendCookie(res: Response, user: IUser, message: string): void;
export { sendCookie };
//# sourceMappingURL=features.d.ts.map