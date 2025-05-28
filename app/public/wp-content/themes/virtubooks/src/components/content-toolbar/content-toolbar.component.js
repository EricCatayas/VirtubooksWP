import React from "react";

export default function ContentToolbar({
  content,
  onAddContent,
  onUpdateStyle,
  onDeleteContent,
}) {
  return (
    <section className="content-toolbar">
      <div className="d-flex align-items-center gap-2 justify-content-start">
        <button
          className="btn btn-secondary content-button"
          onClick={() => onUpdateStyle({ fontStyle: "italic" })}
          aria-label="Italic Text"
        >
          <i className="fas fa-italic"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={() => onUpdateStyle({ fontWeight: "bold" })}
          aria-label="Bold Text"
        >
          <i className="fas fa-bold"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={() => onUpdateStyle({ textDecoration: "underline" })}
          aria-label="Underline Text"
        >
          <i className="fas fa-underline"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={() => onUpdateStyle({ textAlign: "left" })}
          aria-label="Align Left"
        >
          <i className="fas fa-align-left"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={() => onUpdateStyle({ textAlign: "center" })}
          aria-label="Align Center"
        >
          <i className="fas fa-align-center"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={() => onUpdateStyle({ textAlign: "right" })}
          aria-label="Align Right"
        >
          <i className="fas fa-align-right"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={() => onUpdateStyle({ textAlign: "justify" })}
          aria-label="Justify Evenly"
        >
          <i className="fas fa-align-justify"></i>
        </button>
        <button
          className="btn btn-primary content-button"
          onClick={() => onAddContent()}
          aria-label="Add Content"
        >
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="btn btn-danger content-button"
          onClick={() => onDeleteContent()}
          aria-label="Delete Content"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </section>
  );
}
