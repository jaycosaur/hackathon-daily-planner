import { guid } from "./guid";
import { ILocation } from "./ILocation";
import { unixTimestamp } from "./unixTimestamp";

export enum ETaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Blocked = "blocked",
  InReview = "in-review",
  Done = "done",
}

export enum ETaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface ITask {
  _id: null | guid;
  createdUserId: guid;
  assignedUserId: guid;

  title: string;
  description: string;

  status: ETaskStatus;
  priority: ETaskPriority;

  location: null | ILocation;

  imageId: null | guid;
  dueDate: null | unixTimestamp;
}
