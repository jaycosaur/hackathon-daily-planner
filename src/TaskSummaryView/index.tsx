import React from "react";
import {ITask} from "../types/ITask";

export interface ITaskSummaryViewProps {
  task: ITask;
  onEdit: () => void;
}

export const TaskSummaryView: React.FC<ITaskSummaryViewProps> = ({ task, onEdit }) => {
  return <h1>TaskSummaryView
    <button onClick={onEdit}>Edit</button>
  </h1>;
}
