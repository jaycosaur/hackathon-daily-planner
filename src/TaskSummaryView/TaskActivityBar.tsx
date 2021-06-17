import React, { useCallback, useContext, useState } from "react";
import { ITask } from "../types/ITask";
import { Button, TextareaAutosize } from "@material-ui/core";
import { ETaskActivityType } from "../types/ITaskActivity";
import { AppContext } from "../AppHandler/AppContext";
import PhotoUpload from "../PhotoUpload";
import { ITaskImage } from "../types/ITaskImage";

export interface ITaskActivityBar {
  task: ITask;
}

export const TaskActivityBar: React.FC<ITaskActivityBar> = ({ task }) => {
  const { createTaskActivity, createTaskImage, activeUser } =
    useContext(AppContext);
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

  const handlePhotoUpload = async (data: string) => {
    const image: ITaskImage = {
      taskId: task._id,
      userId: activeUser?._id,
      data: data,
    };
    const res = await createTaskImage(image);
    console.log("RES", res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextareaAutosize
        value={commentMessage}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="textarea"
      />
      <Button onClick={handleSubmit}>⬆️</Button>
      <PhotoUpload onUpload={handlePhotoUpload}></PhotoUpload>
    </form>
  );
};
