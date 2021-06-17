import { guid } from "./guid";

export interface ITaskImage {
  _id?: guid;
  taskId: guid;
  userId?: guid;
  data: string; // base64 image data
}
