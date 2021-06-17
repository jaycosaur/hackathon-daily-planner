import React from "react";
import {
  Map,
  TileLayer,
  Tooltip,
  Polyline,
  Polygon,
  CircleMarker,
  Circle,
  Marker,
} from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";

import { Position, PositionEvent, Polygon as PolygonInternal } from "./types";
import { Avatar, Button, ButtonGroup } from "@material-ui/core";
import moment from "moment";

const toPosArray = (pos: Position) =>
  [pos.latitude, pos.longitude] as [number, number];
const position = { latitude: -33.881189, longitude: 151.2134519 } as Position; // home :D

const Comp = (props: {
  center?: Position;
  width: number;
  height: number;
  positions?: Record<string, PositionEvent>;
  polygons: PolygonInternal[];
}) => {
  const [points, setPoints] = React.useState<Position[]>([]);
  const { polygons } = props;
  const onClick = (event: any) => {
    const newPoints = [
      ...points,
      {
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      },
    ];
    console.log(newPoints);
    setPoints(newPoints);
  };

  const pointClickCallback = (e: any, index: any) => {
    if (index === 0 && points.length >= 3) {
      // props.addPolygon(points);
      setPoints([]);
    } else {
      setPoints(points.filter((_, i) => i !== index));
    }
    e.originalEvent.preventDefault();
  };

  const [polygonHovered, setPolygonHovered] = React.useState(null);

  const onHoverEnterPolygon = (id: any) => {
    setPolygonHovered(id);
  };

  const onHoverLeavePolygon = (event: any) => {
    setPolygonHovered(null);
  };

  const getPosMarker = (position: PositionEvent) => {
    const isMachine = position.type === "machine";
    const isDriver = position.type === "driver";
    const color = position.isAlerting ? "red" : isMachine ? "yellow" : "#222";
    console.log(position.userId, position.isAlerting);
    const customIcon = () => (
      <Avatar
        style={{
          top: isDriver ? -32 : -16,
          left: isDriver ? -32 : -16,
          background: isMachine ? undefined : isDriver ? "yellow" : color,
          border: isMachine ? undefined : "4px solid white",
          color: isMachine || isDriver ? "black" : "white",
        }}
        src={isMachine ? undefined : undefined}
      >
        {position.name.split(" ").map((e) => e.substr(0, 1).toUpperCase())}
      </Avatar>
    );
    const customIconMarkup = renderToStaticMarkup(customIcon());
    const customMarkerIcon = divIcon({
      html: customIconMarkup,
    });
    const radius = position.type === "machine" ? 15 : 5;
    return (
      <>
        <Circle
          key={position.userId}
          center={[position.latitude, position.longitude]}
          radius={radius}
          color="white"
          fillColor={color}
          fill={false}
          weight={5}
          opacity={isDriver ? 0 : 1}
          fillOpacity={0.8}
        />
        <Marker
          icon={customMarkerIcon}
          position={[position.latitude, position.longitude]}
        >
          <Tooltip direction="top" offset={[0, -10]}>
            {position.name} last seen {moment(position.timestamp).format("lll")}
          </Tooltip>
        </Marker>
      </>
    );
  };

  // old sat = http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
  // street = http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  // new sat = http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png
  // another sat http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}

  const [baseLayer, setBaseLayer] = React.useState(0);

  const buttonSelectedStyle = { background: "#ffdd00", color: "black" };
  const buttonNotSelectedStyle = { background: "#888", color: "white" };
  return (
    <>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="outlined primary button group"
        style={{ position: "fixed", bottom: 20, left: 20, zIndex: 100 }}
      >
        <Button
          style={baseLayer === 0 ? buttonSelectedStyle : buttonNotSelectedStyle}
          onClick={() => setBaseLayer(0)}
        >
          SAT
        </Button>
        <Button
          style={baseLayer === 1 ? buttonSelectedStyle : buttonNotSelectedStyle}
          onClick={() => setBaseLayer(1)}
        >
          ROAD
        </Button>
      </ButtonGroup>
      <Map
        center={props.center ? toPosArray(props.center) : toPosArray(position)}
        zoom={20}
        maxZoom={24}
        minZoom={17}
        style={{ width: props.width, height: props.height, zIndex: 0 }}
        onClick={onClick}
        animate={true}
        preferCanvas={true}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        {baseLayer === 0 && (
          <TileLayer
            url={"http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"}
            attribution="something"
            maxNativeZoom={24}
          />
        )}

        {baseLayer === 1 && (
          <TileLayer
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="something"
            maxNativeZoom={19}
          />
        )}
        {polygons.map((polygon, id) => (
          <Polygon
            key={polygon.id}
            fillColor={"red"}
            positions={polygon.positions.map(toPosArray)}
            onMouseover={() => onHoverEnterPolygon(id)}
            onMouseout={() => onHoverLeavePolygon(id)}
            bubblingMouseEvents={false}
            stroke={true}
            weight={2}
            opacity={1}
            color={polygonHovered === id ? "white" : "red"}
          >
            <Tooltip>Danger Zone {polygon.id}</Tooltip>
          </Polygon>
        ))}
        {props.positions &&
          Object.values(props.positions)
            .filter((a) => a.latitude && a.longitude)
            .map((positions) => getPosMarker(positions))}
        <Polyline positions={points.map(toPosArray)} color="#ffdd00" />
        {points.map((pt, index) => {
          return (
            <CircleMarker
              key={index}
              center={toPosArray(pt)}
              radius={5}
              onClick={(e: any) => pointClickCallback(e, index)}
              bubblingMouseEvents={false}
              color="#ffdd00"
            />
          );
        })}
      </Map>
    </>
  );
};

export default Comp;
