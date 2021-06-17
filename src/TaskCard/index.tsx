import React from "react";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { ITask, taskPriorityAsString, taskStatusAsChip } from "../types/ITask";
import LocationDisabledIcon from "@material-ui/icons/LocationDisabled";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import moment from "moment";
import {ellipsis} from "../util/ellipsis";

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
          <h3>{ellipsis(title, 20)}</h3>
        </span>
        <span>
          <h5 style={{ color: "grey" }}>
            {dueDate && moment.unix(dueDate).fromNow()}
          </h5>
        </span>
      </div>
      <div style={{ display: "flex" }}>
        {taskStatusAsChip(status)}
        <Chip
          size="small"
          label={taskPriorityAsString(priority)}
          style={{ margin: "0px 5px" }}
        />
        {
          <Chip
            size="small"
            icon={task.location ? <MyLocationIcon /> : <LocationDisabledIcon />}
            label={task.location ? "Location" : "No Location"}
            style={{ margin: "0px 5px" }}
          />
        }
      </div>
    </Paper>
  );
};

export default Task;
