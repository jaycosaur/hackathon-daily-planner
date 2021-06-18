import React from "react";
import Map from "../map";
import { useFilteredTasks } from "../FilterControls/useFilteredTasks";
import { guid } from "../types/guid";
import { Position } from "../map/types";

export interface IMapViewProps {
  width: number;
  height: number;
  onTaskSelect(taskId: guid): void;
  onEmptyPositionSelect(pt: Position): void;
}

const colorMapFromUsers = (
  userId: string | null,
  userIds: string[]
): string => {
  if (!userId) {
    return "white";
  }
  const numberOfUsers = userIds.length;
  const position = userIds.indexOf(userId);
  const positionToRange = (255 * position) / numberOfUsers;
  return `hsl(${positionToRange}, 100%, 50%)`;
};

const MapView: React.FC<IMapViewProps> = ({ width, height, onTaskSelect }) => {
  const { tasks } = useFilteredTasks();
  const userIds = tasks.map((task) => task.assignedUserId).sort();

  return (
    <>
      <Map
        width={width}
        height={height}
        points={tasks
          .filter((task) => task.location)
          .map((task) => ({
            id: task._id,
            latitude: task.location.latitude,
            longitude: task.location.longitude,
            tooltip: task._id,
            color: colorMapFromUsers(task.assignedUserId, userIds),
          }))}
        onPointSelected={(pt) => onTaskSelect(pt.id)}
        onClickPoint={() => {
          console.log("CLICK");
        }}
      />
    </>
  );
};

export default MapView;
