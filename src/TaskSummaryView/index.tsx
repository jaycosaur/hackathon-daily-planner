import React, { useContext } from "react";
import "./style.css";
import { ITask, taskStatusAsChip } from "../types/ITask";
import { Button, Chip } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import { AppContext } from "../AppHandler/AppContext";
import TaskOnMap from "../TaskAddEditView/TaskOnMap";
import { useWindowSize } from "../useWindowSize";
import { TaskActivityCard } from "../TaskActivityCard";
import { TaskActivityBar } from "./TaskActivityBar";
import { ETaskActivityType } from "../types/ITaskActivity";

export interface ITaskSummaryViewProps {
  task: ITask;
  onEdit: () => void;
}

export const TaskSummaryView: React.FC<ITaskSummaryViewProps> = ({
  task,
  onEdit,
}) => {
  const { users, retrieveActivityForTask, retrieveImagesForTask } =
    useContext(AppContext);
  const windowSize = useWindowSize();

  if (task === undefined) {
    // not sure what situations were causing this component to render without a task, but no time to debug
    return null;
  }

  const activeUserForTask = users.find((x) => x._id === task.assignedUserId);

  const images = retrieveImagesForTask(task._id);

  return (
    <div className="component-TaskSummaryView">
      <h2>{task.title}</h2>
      <div className="task-summary-ribbon">
        {taskStatusAsChip(task.status)}
        {activeUserForTask && (
          <Chip
            icon={<FaceIcon />}
            label={activeUserForTask.email.split("@")[0]}
            color="primary"
            variant="outlined"
          />
        )}

        <div className="spacer" />

        {/*<Button>Mark completed</Button>*/}
        <Button onClick={onEdit}>Edit</Button>
      </div>
      <div className="task-map">
        <TaskOnMap
          width={windowSize.width || 0}
          height={200}
          onClick={() => {}}
          onDelete={() => {}}
          point={task.location}
        />
      </div>

      <div className="task-activities">
        {retrieveActivityForTask(task._id).map((taskActivity) => (
          <TaskActivityCard taskActivity={taskActivity} />
        ))}
        {images.map((i) => (
          <TaskActivityCard
            taskActivity={{
              _id: i._id,
              taskId: i.taskId,
              taskImageId: i._id,
              type: ETaskActivityType.Image,
            }}
          />
        ))}
      </div>

      <div className="task-activity-bar">
        <TaskActivityBar task={task} />
      </div>
    </div>
  );
};
