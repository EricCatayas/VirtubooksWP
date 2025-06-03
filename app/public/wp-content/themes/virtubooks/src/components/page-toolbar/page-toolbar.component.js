import React from "react";

export default function PageToolbar({
  onInsert,
  onDelete,
  onDuplicate,
  onBookmark,
  onClear,
  onSetStartPage,
  onSetEndPage,
  onSetNotebookSettings,
  onSetBackgroundImage,
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
        color: "black",
        ...style,
      }}
    >
      <div className="d-flex align-items-center gap-2 justify-content-start">
        <button
          className="btn btn-secondary vb-button"
          onClick={onInsert}
          title="Insert New Page"
        >
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="btn btn-secondary vb-button"
          onClick={onDuplicate}
          title="Duplicate Page"
        >
          <i className="fas fa-copy"></i>
        </button>
        <button
          className="btn btn-secondary vb-button"
          onClick={onBookmark}
          title="Bookmark Page"
        >
          <i className="fas fa-bookmark"></i>
        </button>
        <button
          className="btn btn-secondary vb-button"
          onClick={onSetBackgroundImage}
          title="Set Background Image"
        >
          <i className="fas fa-image"></i>
        </button>

        <button
          className="btn btn-primary vb-button"
          onClick={onClear}
          title="Clear Page"
        >
          <i className="fas fa-eraser"></i>
        </button>
        <button
          className="btn btn-danger vb-button"
          onClick={onDelete}
          title="Delete Page (Warning: deletes two sides of the page)"
        >
          <i className="fas fa-trash"></i>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary vb-button"
            title="Settings"
            data-bs-toggle="dropdown"
            aria-label="Settings"
          >
            <i className="fas fa-cog"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                title="Start page numbering in this page"
                onClick={onSetStartPage}
              >
                <i class="fa-solid fa-1"></i> Set as starting page
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                title="Stop page numbering in this page"
                onClick={onSetEndPage}
              >
                <i class="fa-solid fa-flag-checkered"></i> Set as end page
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                title="Notebook settings"
                onClick={onSetNotebookSettings}
              >
                <i class="fa-solid fa-book"></i> Notebook Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
