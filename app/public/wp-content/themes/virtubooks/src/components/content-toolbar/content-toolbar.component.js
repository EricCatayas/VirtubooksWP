import AddContentControl from "../toolbar-controls/add-content.component";
import React from "react";

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
      <div className="d-flex align-items-center gap-2 justify-content-start">
        <button
          className="btn btn-secondary content-button"
          onClick={() => onMoveUp()}
          title="Move Up"
          aria-label="Move Up"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
        <button
          className="btn btn-secondary content-button"
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
          className="btn btn-danger content-button"
          onClick={() => onDeleteContent()}
          title="Delete Content"
          aria-label="Delete Content"
        >
          <i className="fas fa-trash"></i>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary content-button"
            onClick={() => console.log("Edit Content")}
            title="Settings"
            data-bs-toggle="dropdown"
            aria-label="Settings"
          >
            <i className="fas fa-cog"></i>
          </button>
          <ul className="dropdown-menu">
            {/* <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => console.log("todo")}
              >
                Duplicate Content
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </section>
  );
}
