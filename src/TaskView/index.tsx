import React, { useCallback, useContext, useMemo, useState } from "react";
import { ITask } from "../types/ITask";
import { TaskSummaryView } from "../TaskSummaryView";
import TaskAddEditView from "../TaskAddEditView";
import { guid } from "../types/guid";
import { AppContext } from "../AppHandler/AppContext";

export interface ITaskViewViewProps {
  taskId?: guid; // undefined to create a new task
}

export const TaskView: React.FC<ITaskViewViewProps> = ({ taskId }) => {
  const [mode, setMode] = useState<"view" | "edit" | "new">(
    taskId ? "view" : "new"
  );

  // bit of a hack, store the ID of a task we just created (if in new mode) so we can show the summary screen on save
  const [createdTaskId, setCreatedTaskId] = useState<null | guid>(null);

  const { tasks } = useContext(AppContext);

  const setModeView = useCallback(() => setMode("view"), [setMode]);
  const setModeEdit = useCallback(() => setMode("edit"), [setMode]);
  const handleNewTaskCreated = useCallback(
    (createdTask: ITask) => {
      setCreatedTaskId(createdTask._id);
      setModeView();
    },
    [setModeView]
  );

  const task = useMemo<null | ITask>(() => {
    // allow createdTaskId to override taskId
    const filterTaskId = createdTaskId || taskId;
    if (!filterTaskId) {
      return null;
    }

    return tasks.find((x) => x._id === filterTaskId);
  }, [createdTaskId, taskId, tasks]);

  if (mode === "view") {
    return <TaskSummaryView task={task} onEdit={setModeEdit} />;
  }

  if (mode === "edit") {
    return <TaskAddEditView task={task} onCompleted={setModeView} />;
  }

  if (mode === "new") {
    return <TaskAddEditView onCompleted={handleNewTaskCreated} />;
  }

  return <h1>TaskView</h1>;
};
