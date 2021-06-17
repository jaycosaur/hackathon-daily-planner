import { useRef, useState } from "react";
import { readAndCompressImage } from "browser-image-resizer";

const PhotoUpload = () => {
  const uploader = useRef<HTMLInputElement>();

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (upload) => {
      console.log(upload.target.result);
    };
  };

  const [file, setFile] = useState<string>();
  const [imagePreview, setImagePreview] = useState<any>("");
  const [base64, setBase64] = useState<string>();
  const [name, setName] = useState<string>();
  const [size, setSize] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    }).then((resized) => {
      console.log("resized", resized);
      const blobReader = new FileReader();
      blobReader.readAsDataURL(resized);
      blobReader.onloadend = () => {
        const base64data = blobReader.result;
        setBase64(base64data as string);
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
    <div>
      <label htmlFor="photoupload">
        <div>Upload photo</div>
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
      <img src={base64} />
    </div>
  );
};

export default PhotoUpload;
