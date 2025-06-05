import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  toggleImageSelector,
  selectImage,
} from "../../features/imageSelectorSlice";

export default function ImageUploadsComponent() {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const API_URL = process.env.API_BASE_URL;

  useEffect(() => {
    // Fetch images from the server or any other source
    const token = localStorage.getItem("token");

    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/image-uploads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleSelectImage = (image) => {
    dispatch(selectImage(image));
    dispatch(toggleImageSelector());
  };

  const handleClose = () => {
    dispatch(toggleImageSelector(false));
  };

  const handleRemove = () => {
    dispatch(selectImage({ imageURL: "" }));
  };

  return (
    <div className="container image-uploads-container">
      <h2 className="mb-2">Image Uploads</h2>
      <div className="image-upload-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-upload-item"
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectImage(image)}
          >
            <img src={image.imageURL} alt={image.filename} />
            <p>{image.filename}</p>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col d-flex justify-content-end">
          <button className="btn btn-small btn-outline-accent me-2">
            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
            <a href="/image-uploads" target="_black">
              Upload images
            </a>{" "}
          </button>
          <button
            className="btn btn-small btn-outline-accent me-2"
            onClick={handleRemove}
          >
            Remove Image
          </button>
          <button
            className="btn btn-small btn-outline-accent"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
