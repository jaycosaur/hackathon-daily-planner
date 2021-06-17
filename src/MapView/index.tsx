import React, { useContext } from "react";
import Map from "../map";
import { AppContext } from "../AppHandler/AppContext";
import {guid} from "../types/guid";
import {Position} from "../map/types";

export interface IMapViewProps {
  width: number;
  height: number;
  onTaskSelect(taskId: guid): void;
  onEmptyPositionSelect(pt: Position): void;
}

const MapView: React.FC<IMapViewProps> = ({ width, height, onTaskSelect, onEmptyPositionSelect }) => {
  const { tasks } = useContext(AppContext);
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
          }))}
        onClickPoint={(pt) => onEmptyPositionSelect(pt)}
        onPointSelected={(pt) => onTaskSelect(pt.id)}
      />
    </>
  );
};

export default MapView;
