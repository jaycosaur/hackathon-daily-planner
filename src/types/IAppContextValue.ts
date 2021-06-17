import { IUser } from "./IUser";
import { ITask } from "./ITask";
import { ITaskImage } from "./ITaskImage";
import { ITaskActivity } from "./ITaskActivity";
import { guid } from "./guid";

export interface IAppContextValue {
  isLoading: boolean;

  activeUser: null | IUser; // null if not logged in
  users: IUser[];
  login(email: string): Promise<void>;
  logout(): void;

  tasks: ITask[];
  createTask(task: ITask): Promise<ITask>;
  updateTask(task: ITask): Promise<void>;

  retrieveActivityForTask(taskId: guid): ITaskActivity[];
  createTaskActivity(taskActivity: ITaskActivity): Promise<ITaskActivity>;

  retrieveTaskImage(imageId: guid): Promise<ITaskImage>;
  createTaskImage(image: ITaskImage): Promise<ITaskImage>;
}
