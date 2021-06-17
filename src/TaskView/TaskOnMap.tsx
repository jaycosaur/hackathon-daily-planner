import React from "react";
import { ITask } from "../types/ITask";

import Map from "../map";

const TaskOnMap: React.FC<{ task?: ITask; width: number; height: number }> = ({
  width,
  height,
  task,
}) => {
  if (!task || !task.location) {
    return <Map width={width} height={height} />;
  }
  return (
    <Map
      width={width}
      height={height}
      points={[
        {
          id: task._id,
          latitude: task.location.lat,
          longitude: task.location.long,
        },
      ]}
    />
  );
};

export default TaskOnMap;
