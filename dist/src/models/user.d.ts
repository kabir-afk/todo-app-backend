import mongoose, { type ObjectId } from "mongoose";
interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>;
export default User;
//# sourceMappingURL=user.d.ts.map