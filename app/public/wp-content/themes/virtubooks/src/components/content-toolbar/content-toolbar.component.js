import React from "react";

const defaultfontSizeOptions = [
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Large",
    value: "large",
  },
];

export default function ContentToolbar({
  content,
  onAddContent,
  onDeleteContent,
  onMoveUp,
  onMoveDown,
  toolbarControls,
}) {
  const contentTypeOptions = [
    { type: "paragraph", label: "Paragraph", icon: "fas fa-paragraph" },
    { type: "heading", label: "Heading", icon: "fas fa-heading" },
    { type: "image", label: "Image", icon: "fas fa-image" },
    { type: "quote", label: "Quote", icon: "fas fa-quote-right" },
  ];

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

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle content-button"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-plus"></i>
          </button>
          <ul className="dropdown-menu">
            {contentTypeOptions.map((item) => (
              <li key={item.type}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => onAddContent(item.type)}
                >
                  <i className={item.icon} style={{ marginRight: "0.5em" }}></i>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
