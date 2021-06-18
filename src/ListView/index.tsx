import React from "react";
import Container from "@material-ui/core/Container";
import Task from "../TaskCard";
import {
  ETaskStatus,
  ITask,
  taskStatusAsColor,
  taskStatusAsString,
} from "../types/ITask";
import { useFilteredTasks } from "../FilterControls/useFilteredTasks";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";

export interface IListViewProps {
  onTaskSelect(task: ITask): void;
  topPadding: number;
}

const StatusSummary: React.FC<{ count: number; status: ETaskStatus }> = (
  props
) => {
  return (
    <div>
      <Typography variant="h2">{props.count}</Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 12,
            height: 12,
            marginRight: 6,
            borderRadius: "100%",
            background: taskStatusAsColor(props.status),
          }}
        />
        {
          <Typography variant="caption">
            {taskStatusAsString(props.status)}
          </Typography>
        }
      </div>
    </div>
  );
};

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
  const doneTasks = tasks.filter(({ status }) => status === ETaskStatus.Done);

  tasks.sort((a, b) => a.dueDate - b.dueDate);

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
      <Card>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 6,
          }}
        >
          <StatusSummary
            count={pendingTasks.length}
            status={ETaskStatus.Pending}
          />
          <Divider orientation="vertical" flexItem />
          <StatusSummary
            count={inProgressTasks.length}
            status={ETaskStatus.InProgress}
          />
          <Divider orientation="vertical" flexItem />
          <StatusSummary
            count={blockedTasks.length}
            status={ETaskStatus.Blocked}
          />
          <Divider orientation="vertical" flexItem />
          <StatusSummary count={doneTasks.length} status={ETaskStatus.Done} />
        </CardContent>
      </Card>
      {tasks &&
        tasks.map((t) => (
          <Task key={t._id} task={t} onClick={() => onTaskSelect(t)} />
        ))}
    </Container>
  );
};

export default ListView;
