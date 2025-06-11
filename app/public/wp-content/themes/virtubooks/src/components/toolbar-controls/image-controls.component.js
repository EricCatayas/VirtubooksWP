import React from "react";

export default function ImageToolbarControls({
  content,
  onUpdateStyle,
  onSelectImage,
  onRemoveImage,
}) {
  const handleUpdateStyle = (style) => {
    if (content && content.styles) {
      const updatedStyles = { ...content.styles };
      // if the style already exists and the value is the same, it will be removed.
      Object.keys(style).forEach((key) => {
        if (updatedStyles[key] === style[key]) {
          delete updatedStyles[key];
        } else {
          updatedStyles[key] = style[key];
        }
      });

      onUpdateStyle(updatedStyles);
    } else {
      onUpdateStyle(style);
    }
  };
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-small btn-outline-accent borderless my-0 dropdown-toggle my-0 text-strong"
          type="button"
          title="Edit Image"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-image"></i> Edit
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() => onSelectImage()}
            >
              <i className="fa-solid fa-images"></i> Select Image
            </a>
          </li>
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() => onRemoveImage()}
            >
              <i className="fa-solid fa-eraser"></i> Remove Image
            </a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-small btn-outline-accent borderless my-0 dropdown-toggle my-0"
          type="button"
          title="Image Alignment"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-align-center"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() =>
                handleUpdateStyle({
                  marginLeft: 0,
                  marginRight: "auto",
                })
              }
            >
              <i className="fas fa-align-left"></i> Left
            </a>
          </li>
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() =>
                handleUpdateStyle({
                  marginLeft: "auto",
                  marginRight: "auto",
                })
              }
            >
              <i className="fas fa-align-center"></i> Center
            </a>
          </li>
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() =>
                handleUpdateStyle({
                  marginLeft: "auto",
                  marginRight: 0,
                })
              }
            >
              <i className="fas fa-align-right"></i> Right
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
