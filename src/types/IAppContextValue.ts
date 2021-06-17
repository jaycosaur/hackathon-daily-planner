import {IUser} from "./IUser";
import {ITask} from "./ITask";
import {ITaskImage} from "./ITaskImage";

export interface IAppContextValue {
  isLoading: boolean;

  activeUser: null | IUser; // null if not logged in
  users: IUser[];
  login(email: string): Promise<void>;

  tasks: ITask[];
  createTask(task: ITask): Promise<ITask>;
  updateTask(task: ITask): Promise<ITask>;

  retrieveTaskImage(imageId: string): Promise<ITaskImage>;

  // TODO: activity log/messages/comments
}
