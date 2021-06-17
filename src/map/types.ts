export interface PositionEvent {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  timestamp: number;
  type: "machine" | "worker" | "driver";
  userId: string;
  name: string;
  isAlerting: boolean;
}

export interface AlertEvent {
  id: string;
  type: "machine" | "zone" | "person";
  timestamp: number;
  latitude: number;
  longitude: number;
  altitude: number;
  userId: string;
  name: string;
}
export interface Position {
  latitude: number;
  longitude: number;
}

export interface Polygon {
  positions: Position[];
  id: string;
}
