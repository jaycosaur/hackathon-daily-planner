import {guid} from "./guid";

export enum ETaskActivityType {
  StatusUpdate = "status-update", // e.g. John assigned task to himself, Steve changed priority to high
  Text = "text",
  Image = "image"
}

export interface ITaskActivity {
  _id: guid;
  taskId: guid;

  type: ETaskActivityType,

  text?: string; // used for both status updates and text
  taskImageId?: guid;
}
