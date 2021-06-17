import {guid} from "./guid";

export interface ITaskImage {
  _id: guid;
  data: string; // base64 image data
}
