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
import moment from "moment";

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

const ChatBubble: React.FC<{ text: string; email: string; date: string }> = ({
  text,
  email,
  date,
}) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar>{email[0].toUpperCase()}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={email.split("@")[0] + ` (${date})`}
      secondary={
        <React.Fragment>
          <pre>{text.trim()}</pre>
        </React.Fragment>
      }
    />
  </ListItem>
);

const StatusBubble: React.FC<{ text: string; otherText: string }> = ({
  text,
  otherText,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={<>{otherText}</>}
        secondary={<React.Fragment>{text}</React.Fragment>}
      />
    </ListItem>
  );
};

const ImageBubble: React.FC<{ src: string; email: string; date: string }> = ({
  src,
  email,
  date,
}) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar>{email[0].toUpperCase()}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={email.split("@")[0] + ` (${date})`}
      secondary={
        <img style={{ marginTop: 12 }} src={src} alt="" width={"50%"} />
      }
    />
  </ListItem>
);

const AudioBubble: React.FC<{ src: string; email: string; date: string }> = ({
  src,
  email,
  date,
}) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar>{email[0].toUpperCase()}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={email.split("@")[0] + ` (${date})`}
      secondary={
        <>
          <audio style={{ marginTop: 12 }} controls>
            <source src={src} type="audio/mp3" />
          </audio>
        </>
      }
    />
  </ListItem>
);

export const TaskActivityCard: React.FC<ITaskActivityCardProps> = ({
  taskActivity,
}) => {
  // load image, if we have one
  const taskImage = useTaskImage(taskActivity.taskImageId);

  const { users } = useContext(AppContext);

  if (taskActivity.type === ETaskActivityType.Text) {
    return (
      <ChatBubble
        text={taskActivity.text}
        email={
          users.find((x) => x._id === taskActivity.createdByUserId)?.email ||
          "[Unknown]"
        }
        date={moment.unix(taskActivity.createdAt).fromNow()}
      />
    );
  }

  if (taskActivity.type === ETaskActivityType.StatusUpdate) {
    // aaaaa deadline
    return (
      <StatusBubble
        text={taskActivity.text}
        otherText={(taskActivity as any).otherText}
      />
    );
  }

  if (taskActivity.type === ETaskActivityType.Image) {
    if (!taskImage) {
      // image may not be downloaded yet
      return null;
    }

    if (taskImage.audioData) {
      return (
        <AudioBubble
          src={taskImage.audioData}
          email={
            users.find((x) => x._id === taskActivity.createdByUserId)?.email ||
            "[Unknown]"
          }
          date={moment.unix(taskActivity.createdAt).fromNow()}
        />
      );
    } else {
      return (
        <ImageBubble
          src={taskImage.data}
          email={
            users.find((x) => x._id === taskActivity.createdByUserId)?.email ||
            "[Unknown]"
          }
          date={moment.unix(taskActivity.createdAt).fromNow()}
        />
      );
    }
  }
};
