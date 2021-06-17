import React from "react";
import { ITask } from "../types/ITask";

import Map from "../map";
import { Position } from "../map/types";

const TaskOnMap: React.FC<{
  task?: ITask;
  width: number;
  height: number;
  onClick: (position: Position) => void;
  onDelete: () => void;
}> = ({ width, height, task, onClick, onDelete }) => {
  if (!task || !task.location) {
    return <Map width={width} height={height} onClickPoint={onClick} />;
  }
  return (
    <Map
      width={width}
      height={height}
      points={[
        {
          id: task._id,
          ...task.location,
        },
      ]}
      onClickPoint={onClick}
      onPointSelected={() => onDelete()}
    />
  );
};

export default TaskOnMap;
