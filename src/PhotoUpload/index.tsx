/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { readAndCompressImage } from "browser-image-resizer";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
export interface IPhotoUploadProps {
  onUpload: (base64data: string) => void;
}

const PhotoUpload: React.FC<IPhotoUploadProps> = ({ children, onUpload }) => {
  const uploader = useRef<HTMLInputElement>();

  const [base64, setBase64] = useState<string>();

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log("reader", reader);
    console.log("file", file);
    readAndCompressImage(file, {
      quality: 0.2,
      maxWidth: 800,
      maxHeight: 600,
      autoRotate: true,
    }).then((resized) => {
      console.log("resized", resized);
      const blobReader = new FileReader();
      blobReader.readAsDataURL(resized);
      blobReader.onloadend = () => {
        const base64data = blobReader.result as string;
        onUpload(base64data);
      };
    });
    // if (reader !== undefined && file !== undefined) {
    //   reader.onloadend = () => {
    //     setFile(file);
    //     setSize(file.size);
    //     setName(file.name);
    //     console.log(reader.result);
    //     // setBase64(btoa(reader.result as string));
    //   };
    //   reader.readAsArrayBuffer(file);
    // }
  };

  return (
    <label
      style={{
        display: "inline-block",
      }}
      htmlFor="photoupload"
    >
      <div
        style={{
          width: 64,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PhotoCameraIcon fontSize="small" />
      </div>
      <input
        id="photoupload"
        style={{ display: "none" }}
        ref={uploader}
        type="file"
        accept="image/*"
        capture="environment"
        // @ts-ignore
        onChange={photoUpload}
      ></input>
    </label>
  );
};

export default PhotoUpload;
