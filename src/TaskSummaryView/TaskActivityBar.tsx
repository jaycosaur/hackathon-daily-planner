import React, { useCallback, useContext, useState } from "react";
import { ITask } from "../types/ITask";
import { Button, TextareaAutosize } from "@material-ui/core";
import { ETaskActivityType } from "../types/ITaskActivity";
import { AppContext } from "../AppHandler/AppContext";
import PhotoUpload from "../PhotoUpload";

export interface ITaskActivityBar {
  task: ITask;
}

export const TaskActivityBar: React.FC<ITaskActivityBar> = ({ task }) => {
  const { createTaskActivity } = useContext(AppContext);
  const [commentMessage, setCommentMessage] = useState<string>("");

  const handleChange = useCallback(
    (e: any) => {
      setCommentMessage(e.target.value);
    },
    [setCommentMessage]
  );

  const handleSubmit = useCallback(() => {
    // post text as new event
    createTaskActivity({
      type: ETaskActivityType.Text,
      taskId: task._id,
      text: commentMessage,
    } as any).catch(console.error);

    setCommentMessage("");

    // sorry mum
    setTimeout(() => setCommentMessage(""), 500);
  }, [commentMessage, setCommentMessage, createTaskActivity, task._id]);

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.shiftKey === true && e.keyCode === 13) {
        // shift-enter
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextareaAutosize
        value={commentMessage}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="textarea"
      />
      <Button onClick={handleSubmit}>⬆️</Button>
      <PhotoUpload
        onUpload={(base64data) => {
          console.log(base64data);
        }}
      ></PhotoUpload>
    </form>
  );
};
