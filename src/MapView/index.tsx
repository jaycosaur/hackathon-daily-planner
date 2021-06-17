import React from "react";
import Map from "../map";
import { v4 as uuid } from "uuid";

const MapView = (props: { width: number; height: number }) => {
  const [points, setPoints] = React.useState<
    Array<{
      latitude: number;
      longitude: number;
      id: string;
    }>
  >([
    {
      latitude: -33.881144323948234,
      longitude: 151.2135851533549,
      id: "1",
    },
  ]);

  return (
    <>
      <Map
        width={props.width}
        height={props.height}
        points={points}
        onClickPoint={(pt) =>
          setPoints((old) => [...old, { id: uuid(), ...pt }])
        }
        onPointSelected={(pt) =>
          setPoints((old) => old.filter((old) => old.id !== pt.id))
        }
      />
    </>
  );
};

export default MapView;
