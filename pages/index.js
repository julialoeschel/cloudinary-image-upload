import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [imageValue, setImageValue] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  return (
    <>
      <h1>Cloudinary Image upload</h1>
      <h2>pic an image</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);

          formData.append("file", image);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET
          );
          console.log(formData);
          const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNAME}/upload`;
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
          const json = await response.json();

          setImages([...images, json]);
          setImage(null);
        }}
      >
        <label htmlFor="file"></label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/png, image/jpeg"
          value={imageValue}
          onChange={(event) => {
            setImageValue(event.target.value);
            setImage(event.target.files[0]);
          }}
        />
        <button type="submit">Upload</button>
      </form>
      <h2>uploaded images are here</h2>
      {images.map((image) => {
        console.log(image);
        return (
          <div key={image.asset_id}>
            <Image
              alt="something here"
              src={image.secure_url}
              width={image.width}
              height={image.height}
            ></Image>
          </div>
        );
      })}
    </>
  );
}
