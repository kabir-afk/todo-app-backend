import mongoose from "mongoose";
interface ITask {
    todo: string;
    isCompleted: boolean;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
}
declare const TASK: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, mongoose.DefaultSchemaOptions> & ITask & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, ITask>;
export default TASK;
//# sourceMappingURL=todo.d.ts.map