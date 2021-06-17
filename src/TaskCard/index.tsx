import React from "react";
import Paper from "@material-ui/core/Paper";
import { format, fromUnixTime } from "date-fns";
import Chip from "@material-ui/core/Chip";
import { ETaskStatus, getStatusIcon, ITask } from "../types/ITask";

export interface ITaskProps {
  task: ITask;
  onClick(): void;
}

const Task: React.FC<ITaskProps> = ({ task, onClick }) => {
  const { title, status, priority, dueDate } = task;
  return (
    <Paper
      style={{
        // border: "1px solid black",
        padding: "1rem",
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <span>
          <h3>{title}</h3>
        </span>
        <span>
          <h5 style={{ color: "grey" }}>
            {dueDate && format(fromUnixTime(dueDate), "PPPPpppp")}
          </h5>
        </span>
      </div>
      <div style={{ display: "flex" }}>
        <Chip icon={getStatusIcon(status)} size="small" label={status} />
        <Chip size="small" label={priority} style={{ margin: "0px 5px" }} />
      </div>
    </Paper>
  );
};

export default Task;
