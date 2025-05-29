import React from "react";

export default function PageToolbar({
  onInsert,
  onDelete,
  onSetBackgroundImage,
  onSave,
  style = {},
}) {
  return (
    <div
      className="page-toolbar"
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 20,
        display: "flex",
        gap: "0.5em",
        pointerEvents: "auto",
        ...style,
      }}
    >
      <div className="d-flex align-items-center gap-2 justify-content-start">
        <button
          className="btn btn-secondary content-button"
          onClick={onInsert}
          title="Insert New Page"
        >
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="btn btn-danger content-button"
          onClick={onDelete}
          title="Delete Page"
        >
          <i className="fas fa-trash"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={onSetBackgroundImage}
          title="Set Background Image"
        >
          <i className="fas fa-image"></i>
        </button>
        <button
          className="btn btn-primary content-button"
          onClick={onSave}
          title="Save Changes"
        >
          <i className="fas fa-save"></i>
        </button>
      </div>
    </div>
  );
}
