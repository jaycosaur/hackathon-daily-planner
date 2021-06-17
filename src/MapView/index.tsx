import React, { useContext } from "react";
import Map from "../map";
import { AppContext } from "../AppHandler/AppContext";

const MapView = (props: { width: number; height: number }) => {
  const { tasks } = useContext(AppContext);
  return (
    <>
      <Map
        width={props.width}
        height={props.height}
        points={tasks
          .filter((task) => task.location)
          .map((task) => ({
            id: task._id,
            latitude: task.location.latitude,
            longitude: task.location.longitude,
          }))}
        onClickPoint={(pt) => {
          console.log("MAP CLICKED", pt);
        }}
        onPointSelected={(pt) => {
          console.log("TASK SELECTED", pt);
        }}
      />
    </>
  );
};

export default MapView;
