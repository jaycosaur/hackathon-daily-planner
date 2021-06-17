import { guid } from "./guid";
import { ILocation } from "./ILocation";
import { unixTimestamp } from "./unixTimestamp";
import { Assignment, Build, PanTool, Visibility } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";

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

export const getStatusIcon = (status: ETaskStatus) => {
  switch (status) {
    case ETaskStatus.Pending:
      return <Assignment />;
    case ETaskStatus.Done:
      return <DoneIcon />;
    case ETaskStatus.Blocked:
      return <PanTool />;
    case ETaskStatus.InProgress:
      return <Build />;
    case ETaskStatus.InReview:
      return <Visibility />;
  }
};

export interface ITask {
  _id: guid;
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
