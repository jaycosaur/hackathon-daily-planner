import React from "react";
import { Map, TileLayer, Tooltip, CircleMarker } from "react-leaflet";
import { usePosition } from "use-position";

import { Position } from "./types";
import { Button, ButtonGroup } from "@material-ui/core";

const toPosArray = (pos: Position) =>
  [pos.latitude, pos.longitude] as [number, number];
const position = { latitude: -33.881189, longitude: 151.2134519 } as Position; // home :D

enum MapBaseLayer {
  "SAT",
  "ROAD",
}

type Point = {
  latitude: number;
  longitude: number;
  id: string;
  color?: string;
  tooltip?: React.ReactNode;
};

const BaseLayer: React.FC<{ type: MapBaseLayer }> = ({ type }) => {
  if (type === MapBaseLayer.SAT) {
    return (
      <TileLayer
        url={"http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"}
        attribution="something"
        maxNativeZoom={24}
      />
    );
  }

  return (
    <TileLayer
      url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="something"
      maxNativeZoom={19}
    />
  );
};

const LayerSelectComponent: React.FC<{
  selectedBaseLayer: MapBaseLayer;
  onSelect: (baseLayer: MapBaseLayer) => void;
}> = (props) => {
  const buttonSelectedStyle = { background: "#ffdd00", color: "black" };
  const buttonNotSelectedStyle = { background: "#888", color: "white" };
  return (
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="outlined primary button group"
      style={{ position: "fixed", bottom: 20, left: 20, zIndex: 100 }}
    >
      <Button
        style={
          props.selectedBaseLayer === MapBaseLayer.SAT
            ? buttonSelectedStyle
            : buttonNotSelectedStyle
        }
        onClick={() => props.onSelect(MapBaseLayer.SAT)}
      >
        SAT
      </Button>
      <Button
        style={
          props.selectedBaseLayer === MapBaseLayer.ROAD
            ? buttonSelectedStyle
            : buttonNotSelectedStyle
        }
        onClick={() => props.onSelect(MapBaseLayer.ROAD)}
      >
        ROAD
      </Button>
    </ButtonGroup>
  );
};

const MapComponent = (props: {
  center?: Position;
  width: number;
  height: number;
  points?: Point[];
  onClickPoint?: (point: Position) => void;
  onPointSelected?: (point: Point) => void;
}) => {
  const onClick = (event: any) => {
    if (!props.onClickPoint) {
      return;
    }
    props.onClickPoint({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  };

  const pointClickCallback = (e: any, point: Point) => {
    if (!props.onPointSelected) {
      return;
    }
    props.onPointSelected(point);
  };

  // old sat = http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
  // street = http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  // new sat = http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png
  // another sat http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}

  const [baseLayer, setBaseLayer] = React.useState<MapBaseLayer>(
    MapBaseLayer.SAT
  );

  const { latitude, longitude, errorMessage } = usePosition(true);

  console.log(latitude, longitude, errorMessage);

  return (
    <>
      {false && (
        <LayerSelectComponent
          onSelect={setBaseLayer}
          selectedBaseLayer={baseLayer}
        />
      )}
      <Map
        center={props.center ? toPosArray(props.center) : toPosArray(position)}
        zoom={20}
        maxZoom={24}
        minZoom={17}
        style={{ width: props.width, height: props.height, zIndex: 0 }}
        onClick={onClick}
        animate={true}
        preferCanvas={true}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <BaseLayer type={baseLayer} />
        {typeof longitude === "number" && (
          <CircleMarker
            key={"me-bottom"}
            center={toPosArray({
              latitude,
              longitude,
            })}
            radius={40}
            weight={3}
            opacity={0}
            fill={true}
            bubblingMouseEvents={false}
            fillOpacity={0.4}
            fillColor={"#03c2fc"}
            bor
            color={"#ffffff"}
          ></CircleMarker>
        )}
        {typeof longitude === "number" && (
          <CircleMarker
            key={"me"}
            center={toPosArray({
              latitude,
              longitude,
            })}
            radius={10}
            weight={3}
            fill={true}
            bubblingMouseEvents={false}
            fillOpacity={1}
            fillColor={"#03c2fc"}
            bor
            color={"#ffffff"}
          ></CircleMarker>
        )}
        {props.points?.map((point) => (
          <CircleMarker
            key={point.id}
            center={toPosArray(point)}
            radius={10}
            fill={true}
            onClick={(e: any) => pointClickCallback(e, point)}
            bubblingMouseEvents={false}
            fillOpacity={1}
            fillColor={point.color || "#ffdd00"}
            color={point.color || "#ffdd00"}
          >
            <Tooltip direction="top" offset={[0, -10]}>
              {point.tooltip}
            </Tooltip>
          </CircleMarker>
        ))}
      </Map>
    </>
  );
};

export default MapComponent;
