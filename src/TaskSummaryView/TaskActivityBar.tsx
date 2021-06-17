import React, {useCallback, useContext, useState} from "react";
import {ITask} from "../types/ITask";
import {Button, TextField} from "@material-ui/core";
import {ETaskActivityType} from "../types/ITaskActivity";
import {AppContext} from "../AppHandler/AppContext";
import PhotoUpload from "../PhotoUpload";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";

export interface ITaskActivityBar {
  task: ITask;
}

export const TaskActivityBar: React.FC<ITaskActivityBar> = ({task}) => {
    const {createTaskActivity, createTaskImage, activeUser} =
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

    const handlePhotoUpload = useCallback(async (data: string) => {
      const taskImage = await createTaskImage({
        taskId: task._id,
        userId: activeUser?._id,
        data: data,
      });

      await createTaskActivity({
        taskId: task._id,
        createdAt: moment().unix(),
        type: ETaskActivityType.Image,
        taskImageId: taskImage._id
      } as any);

      // app handler will re-load task activities and display the image
    }, [task._id, activeUser?._id, createTaskActivity, createTaskImage]);


    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="standard-textarea"
          placeholder="Write a message"
          value={commentMessage}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="textarea"
          multiline
          variant="outlined"
        />

        <Button onClick={handleSubmit} size="small">
          <SendIcon fontSize="small"/>
        </Button>
        <Button onClick={() => console.log("UPLOAD")} size="small">
          <AttachFileIcon fontSize="small"/>
        </Button>
        <PhotoUpload onUpload={handlePhotoUpload}/>
      </form>
    );
  }
;
