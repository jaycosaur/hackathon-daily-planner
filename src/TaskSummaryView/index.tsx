import React, {useContext} from "react";
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
import moment from "moment";
import {ellipsis} from "../util/ellipsis";

export interface ITaskSummaryViewProps {
  task: ITask;
  onEdit: () => void;
}

export const TaskSummaryView: React.FC<ITaskSummaryViewProps> = ({
  task,
  onEdit,
}) => {
  const { users, activeUser, retrieveActivityForTask } =
    useContext(AppContext);
  const windowSize = useWindowSize();

  if (task === undefined) {
    // not sure what situations were causing this component to render without a task, but no time to debug
    return null;
  }

  const activeUserForTask = users.find((x) => x._id === task.assignedUserId);
  const createdUserForTask = users.find((x) => x._id === task.createdUserId);

  // sort in render, sorry
  const taskActivities = retrieveActivityForTask(task._id);
  taskActivities.sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div className="component-TaskSummaryView">
      <div className="task-summary-bar"
           style={{
             backgroundImage:
               "linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5))",
           }}
      >
        <h2>{ellipsis(task.title, 25)}</h2>
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

          <Button onClick={onEdit}>Edit</Button>
        </div>
      </div>
      <div className="task-summary-bar-spacer"></div>

      <div className="task-map">
        {windowSize.width && (
          <TaskOnMap
            width={windowSize.width}
            height={200}
            onClick={() => {}}
            onDelete={() => {}}
            point={task.location}
          />
        )}
      </div>

      <div className="task-activities">
        {
          createdUserForTask &&
          <TaskActivityCard
              key={"first"}
              taskActivity={{
                _id: "first",
                taskId: task._id,
                createdAt: moment().unix(),
                createdByUserId: activeUser._id,
                text: `Created by ${createdUserForTask.email.split("@")[0]}`,
                otherText: task.description,
                type: ETaskActivityType.StatusUpdate,
              } as any}
          />
        }
        {
          taskActivities.length === 0 &&
            <div>
                <h3>There's nothing here.</h3>
                <h4>Write some updates ✍️</h4>
            </div>
        }
        {taskActivities.map((taskActivity) => (
          <TaskActivityCard
            taskActivity={taskActivity}
            key={taskActivity._id}
          />
        ))}
      </div>

      <div className="task-activity-bar">
        <TaskActivityBar task={task} />
      </div>
    </div>
  );
};
