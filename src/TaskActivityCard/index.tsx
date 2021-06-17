import { ETaskActivityType, ITaskActivity } from "../types/ITaskActivity";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppHandler/AppContext";
import { ITaskImage } from "../types/ITaskImage";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

export interface ITaskActivityCardProps {
  taskActivity: ITaskActivity;
}

function useTaskImage(imageId?: string): undefined | ITaskImage {
  const { retrieveTaskImage } = useContext(AppContext);
  const [taskImage, setTaskImage] = useState<undefined | ITaskImage>(undefined);

  useEffect(() => {
    setTaskImage(undefined);

    if (!imageId) {
      return;
    }

    retrieveTaskImage(imageId)
      .then((x) => setTaskImage(x))
      .catch((e) => {
        console.error(e);
        setTaskImage(undefined);
      });
  }, [imageId, retrieveTaskImage]);

  return taskImage;
}

const ChatBubble: React.FC<{ text: string; email: string }> = ({
  text,
  email,
}) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar>{email[0]}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary="Message"
      secondary={<React.Fragment>{text}</React.Fragment>}
    />
  </ListItem>
);

const StatusBubble: React.FC<{ text: string }> = ({ text }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary="Status Update"
        secondary={<React.Fragment>{text}</React.Fragment>}
      />
    </ListItem>
  );
};

export const TaskActivityCard: React.FC<ITaskActivityCardProps> = ({
  taskActivity,
}) => {
  // load image, if we have one
  const taskImage = useTaskImage(taskActivity.taskImageId);

  if (taskActivity.type === ETaskActivityType.Text) {
    return <ChatBubble text={taskActivity.text} email="DUMMY" />;
  }

  if (taskActivity.type === ETaskActivityType.StatusUpdate) {
    return <StatusBubble text={taskActivity.text} />;
  }

  if (taskActivity.type === ETaskActivityType.Image) {
    return (
      <ListItem alignItems="flex-start">
        <ListItemText primary="Image Uploaded" />
        {taskImage && <img src={taskImage.data} alt="" width={"100%"} />}
      </ListItem>
    );
  }
};
