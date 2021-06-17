import { guid } from "./guid";
import { ILocation } from "./ILocation";
import { unixTimestamp } from "./unixTimestamp";
import { Assignment, Build, PanTool, Visibility } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";
import { Chip } from "@material-ui/core";

// TODO: this is all a bit gross... a map would be better
export enum ETaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Blocked = "blocked",
  InReview = "in-review",
  Done = "done",
}
export function taskStatusAsString(taskStatus: ETaskStatus): string {
  switch (taskStatus) {
    case ETaskStatus.Pending:
      return "Pending";
    case ETaskStatus.InProgress:
      return "In Progress";
    case ETaskStatus.Blocked:
      return "Blocked";
    case ETaskStatus.InReview:
      return "In Review";
    case ETaskStatus.Done:
      return "Done";
  }
}
export function taskStatusAsColor(taskStatus: ETaskStatus): string {
  switch (taskStatus) {
    case ETaskStatus.Pending:
      return "#faa";
    case ETaskStatus.InProgress:
      return "#ff0";
    case ETaskStatus.Blocked:
      return "#f00";
    case ETaskStatus.InReview:
      return "#0af";
    case ETaskStatus.Done:
      return "#afa";
  }
}

export enum ETaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}
export function taskPriorityAsString(taskPriority: ETaskPriority): string {
  switch (taskPriority) {
    case ETaskPriority.High:
      return "High";
    case ETaskPriority.Medium:
      return "Medium";
    case ETaskPriority.Low:
      return "Low";
  }
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

export const taskStatusAsChip = (
  status: ETaskStatus,
  style?: React.CSSProperties
) => {
  return (
    <Chip
      icon={getStatusIcon(status)}
      size="small"
      label={taskStatusAsString(status)}
      style={{...style, backgroundColor: taskStatusAsColor(status)}}
    />
  );
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
