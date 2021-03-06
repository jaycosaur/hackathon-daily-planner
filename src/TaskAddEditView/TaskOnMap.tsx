import React from "react";

import Map from "../map";
import { Position } from "../map/types";
import { ILocation } from "../types/ILocation";

const TaskOnMap: React.FC<{
  point?: ILocation;
  width: number;
  height: number;
  onClick: (position: Position) => void;
  onDelete: () => void;
}> = ({ width, height, onClick, onDelete, point }) => {
  return (
    <Map
      center={point}
      width={width}
      height={height}
      onClickPoint={onClick}
      points={
        point
          ? [
              {
                id: "jk_fake_id",
                ...point,
                color: "#FFFF00",
              },
            ]
          : []
      }
    />
  );
};

export default TaskOnMap;
