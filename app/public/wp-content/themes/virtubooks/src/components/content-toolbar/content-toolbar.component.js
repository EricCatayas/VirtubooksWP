import AddContentControl from "../toolbar-controls/add-content.component";
import React from "react";

export default function ContentToolbar({
  content,
  onAddContent,
  onDeleteContent,
  onMoveUp,
  onMoveDown,
  toolbarControls,
}) {
  return (
    <section className="content-toolbar">
      <div className="d-flex align-items-center gap-2 justify-content-start">
        <button
          className="btn btn-secondary content-button"
          onClick={() => onMoveUp()}
          aria-label="Move Up"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
          onClick={() => onMoveDown()}
          aria-label="Move Down"
        >
          <i className="fas fa-arrow-down"></i>
        </button>
        {/* Slot for custom controls  */}
        {toolbarControls}

        <AddContentControl onAddContent={(type) => onAddContent(type)} />
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
