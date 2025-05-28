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
  onUpdateStyle,
  onDeleteContent,
  onMoveUp,
  onMoveDown,
  fontSizeOptions = defaultfontSizeOptions,
}) {
  const contentTypeOptions = [
    { type: "paragraph", label: "Paragraph", icon: "fas fa-paragraph" },
    { type: "heading", label: "Heading", icon: "fas fa-heading" },
    { type: "list", label: "List", icon: "fas fa-list-ul" },
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
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle content-button"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-font"></i>
          </button>
          <ul className="dropdown-menu">
            {fontSizeOptions.map((option) => (
              <li key={option.value}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => onUpdateStyle({ fontSize: option.value })}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
