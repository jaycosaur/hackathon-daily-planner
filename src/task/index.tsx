import React from "react";
import { format, fromUnixTime } from "date-fns";
import Chip from "@material-ui/core/Chip";

const Task = ({ task }) => {
  const { title, status, priority, dueDate } = task;
  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
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
        <Chip size="small" label={status} />
        <Chip size="small" label={priority} style={{ margin: "0px 5px" }} />
      </div>
    </div>
  );
};

export default Task;
