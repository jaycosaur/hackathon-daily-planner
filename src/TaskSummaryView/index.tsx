import React, {useContext} from "react";
import "./style.css";
import {ITask, taskStatusAsColor, taskStatusAsString} from "../types/ITask";
import {Button, Chip, Typography} from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import {AppContext} from "../AppHandler/AppContext";

export interface ITaskSummaryViewProps {
  task: ITask;
  onEdit: () => void;
}

export const TaskSummaryView: React.FC<ITaskSummaryViewProps> = ({ task, onEdit }) => {
  const { users } = useContext(AppContext);

  const activeUserForTask = users.find(x => x._id === task.assignedUserId);

  return <div className="component-TaskSummaryView">
    <Typography variant="h1">{task.title}</Typography>
    <div className="task-summary-ribbon">
      <Chip
        // icon={<FaceIcon />}
        label={taskStatusAsString(task.status)}
        style={{color: taskStatusAsColor(task.status)}}
        variant="outlined"
      />
      {
        activeUserForTask &&
        <Chip
            icon={<FaceIcon />}
            label={activeUserForTask.email.split("@")[0]}
            color="primary"
            variant="outlined"
        />
      }

      <div className="spacer" />

      <Button>Mark completed</Button>
      <Button>Edit</Button>
    </div>
  </div>

  return <h1>TaskSummaryView
    <button onClick={onEdit}>Edit</button>
  </h1>;
}
