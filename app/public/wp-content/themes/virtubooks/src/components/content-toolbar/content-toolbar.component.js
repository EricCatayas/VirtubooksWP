import AddContentControl from "../toolbar-controls/add-content.component";
import React from "react";
import "./content-toolbar.styles.css";

export default function ContentToolbar({
  content,
  onAddContent,
  onDeleteContent,
  onMoveUp,
  onMoveDown,
  toolbarControls,
  styles = {},
}) {
  return (
    <section
      className="content-toolbar"
      style={{
        color: "black",
        ...styles,
      }}
    >
      <div className="d-flex align-items-center gap-1">
        <button
          className="btn btn-small btn-outline-accent borderless my-0"
          onClick={() => onMoveUp()}
          title="Move Up"
          aria-label="Move Up"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
        <button
          className="btn btn-small btn-outline-accent borderless my-0"
          onClick={() => onMoveDown()}
          title="Move Down"
          aria-label="Move Down"
        >
          <i className="fas fa-arrow-down"></i>
        </button>
        {/* Slot for custom controls  */}
        {toolbarControls}

        <AddContentControl onAddContent={(type) => onAddContent(type)} />
        <button
          className="btn btn-small btn-outline-accent borderless my-0 btn-danger"
          onClick={() => onDeleteContent()}
          title="Delete Content"
          aria-label="Delete Content"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </section>
  );
}
