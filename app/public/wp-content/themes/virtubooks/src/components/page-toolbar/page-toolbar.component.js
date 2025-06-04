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
  toolbarControls,
  style = {},
}) {
  return (
    <div
      className="content-toolbar"
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        ...style,
      }}
    >
      <div className="d-flex align-items-center gap-1">
        {toolbarControls}
        <button
          className="btn btn-small btn-outline-accent borderless my-0"
          onClick={onInsert}
          title="Insert New Page"
        >
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="btn btn-small btn-outline-accent borderless my-0"
          onClick={onDuplicate}
          title="Duplicate Page"
        >
          <i className="fas fa-copy"></i>
        </button>
        <button
          className="btn btn-small btn-outline-accent borderless my-0"
          onClick={onBookmark}
          title="Bookmark Page"
        >
          <i className="fas fa-bookmark"></i>
        </button>
        <button
          className="btn btn-small btn-outline-accent borderless my-0"
          onClick={onSetBackgroundImage}
          title="Set Background Image"
        >
          <i className="fas fa-image"></i>
        </button>

        <button
          className="btn btn-small btn-outline-accent borderless my-0"
          onClick={onClear}
          title="Clear Page"
        >
          <i className="fas fa-eraser"></i>
        </button>
        <button
          className="btn btn-small btn-outline-accent borderless my-0 btn-danger"
          onClick={onDelete}
          title="Delete Page (Warning: deletes two sides of the page)"
        >
          <i className="fas fa-trash"></i>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-small btn-outline-accent borderless my-0"
            title="Settings"
            data-bs-toggle="dropdown"
            aria-label="Settings"
          >
            <i className="fas fa-cog"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item text-accent"
                href="#"
                title="Start page numbering in this page"
                onClick={onSetStartPage}
              >
                <i class="fa-solid fa-1"></i> Set as starting page
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-accent"
                href="#"
                title="Stop page numbering in this page"
                onClick={onSetEndPage}
              >
                <i class="fa-solid fa-flag-checkered"></i> Set as end page
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-accent"
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
