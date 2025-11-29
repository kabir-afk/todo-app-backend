import { type Response, type Request, type NextFunction } from "express";
declare function newTask(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
declare function getUserTask(req: Request, res: Response, next: NextFunction): Promise<void>;
declare function updateTask(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
declare function editTask(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
declare function deleteTask(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export { newTask, getUserTask, editTask, updateTask, deleteTask };
//# sourceMappingURL=todo.d.ts.map