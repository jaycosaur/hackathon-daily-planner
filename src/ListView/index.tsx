import React from "react";
import Container from "@material-ui/core/Container";
import Task from "../TaskCard";
import { ETaskStatus, getStatusIcon, ITask } from "../types/ITask";
import { useFilteredTasks } from "../FilterControls/useFilteredTasks";
import { Badge } from "@material-ui/core";

export interface IListViewProps {
  onTaskSelect(task: ITask): void;
  topPadding: number;
}

const ListView: React.FC<IListViewProps> = ({ onTaskSelect, topPadding }) => {
  const { tasks } = useFilteredTasks();

  const pendingTasks = tasks.filter(
    ({ status }) => status === ETaskStatus.Pending
  );
  const inProgressTasks = tasks.filter(
    ({ status }) => status === ETaskStatus.InProgress
  );
  const blockedTasks = tasks.filter(
    ({ status }) => status === ETaskStatus.Blocked
  );

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        margin: "1rem 0px",
      }}
    >
      <div style={{ height: topPadding, width: "100%" }} />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <div
          style={{
            fontSize: 20,
          }}
        >
          Summary:{" "}
        </div>

        <div
          style={{
            paddingRight: 12,
          }}
        >
          <Badge badgeContent={pendingTasks.length} color="primary">
            {getStatusIcon(ETaskStatus.Pending)}
          </Badge>
        </div>
        <div
          style={{
            paddingRight: 12,
          }}
        >
          <Badge badgeContent={inProgressTasks.length} color="primary">
            {getStatusIcon(ETaskStatus.InProgress)}
          </Badge>
        </div>
        <div
          style={{
            paddingRight: 12,
          }}
        >
          <Badge badgeContent={blockedTasks.length} color="primary">
            {getStatusIcon(ETaskStatus.Blocked)}
          </Badge>
        </div>
      </div>
      {tasks &&
        tasks.map((t) => (
          <Task key={t._id} task={t} onClick={() => onTaskSelect(t)} />
        ))}
    </Container>
  );
};

export default ListView;
