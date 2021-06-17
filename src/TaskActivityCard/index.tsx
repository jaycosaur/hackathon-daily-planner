import {ETaskActivityType, ITaskActivity} from "../types/ITaskActivity";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../AppHandler/AppContext";
import {ITaskImage} from "../types/ITaskImage";

export interface ITaskActivityCardProps {
  taskActivity: ITaskActivity
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
      .then(x => setTaskImage(x))
      .catch(e => {
        console.error(e);
        setTaskImage(undefined);
      });
  }, [imageId, retrieveTaskImage]);

  return taskImage;
}

export const TaskActivityCard: React.FC<ITaskActivityCardProps> = ({taskActivity}) => {
  // load image, if we have one
  const taskImage = useTaskImage(taskActivity.taskImageId);

  if (taskActivity.type === ETaskActivityType.Text) {
    return <div>Text: {taskActivity.text}</div>
  }

  if (taskActivity.type === ETaskActivityType.StatusUpdate) {
    return <div>Status update: {taskActivity.text}</div>
  }

  if (taskActivity.type === ETaskActivityType.Image) {
    // this is async, image may not be loaded yet
    return <div>
      {
        taskImage &&
        <img src={"data:image/png;base64," + taskImage.data} alt="" />
      }
    </div>
  }

  if (taskActivity.type === ETaskActivityType.Text) {
    return <div>Text: {taskActivity.text}</div>
  }
};
