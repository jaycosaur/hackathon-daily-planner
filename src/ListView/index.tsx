import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";
import ImportExport from "@material-ui/icons/ImportExport";
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import { AppContext } from "../AppHandler/AppContext";
import Task from "../TaskCard";
import {ETaskStatus, ITask} from "../types/ITask";

export interface IListViewProps {
  onTaskSelect(task: ITask): void;
}

const ListView: React.FC<IListViewProps> = ({ onTaskSelect }) => {
  const { tasks } = useContext(AppContext);

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
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="outlined"
          style={{ fontSize: "0.5rem", flexBasis: "80.00%" }}
          size="medium"
          startIcon={<Search />}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          style={{ fontSize: "0.5rem", flexBasis: "10%" }}
          size="medium"
          startIcon={<Add />}
        ></Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            style={{ fontSize: "0.5rem" }}
            size="small"
          >
            My tasks
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            style={{ fontSize: "0.5rem" }}
            size="small"
          >
            Open tasks
          </Button>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <IconButton
            size="small"
            style={{ border: "1px solid grey", color: "black" }}
          >
            <ImportExport />
          </IconButton>
          <IconButton
            size="small"
            style={{ border: "1px solid grey", color: "black" }}
          >
            <FilterList />
          </IconButton>
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <p>Pending {pendingTasks.length}</p>
        <p>In-Progress {inProgressTasks.length}</p>
        <p>Blocked {blockedTasks.length}</p>
      </div>
      {tasks && tasks.map((t) => <Task key={t._id} task={t} onClick={() => onTaskSelect(t)} />)}
    </Container>
  );
};

export default ListView;
