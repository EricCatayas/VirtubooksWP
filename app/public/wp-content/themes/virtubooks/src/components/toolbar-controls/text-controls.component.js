import React from "react";
import {
  defaultfontSizeOptions,
  fontFamilyOptions,
  textAlignOptions,
  lineHeightOptions,
} from "../../config/ui";

export default function TextToolbarControls({
  content,
  onUpdateStyle,
  onAddIndent,
  onReduceIndent,
  fontSizeOptions = defaultfontSizeOptions,
}) {
  const getTextAlignIcon = (value) => {
    if (value) {
      switch (value) {
        case "center":
          return "fas fa-align-center";
        case "right":
          return "fas fa-align-right";
        case "justify":
          return "fas fa-align-justify";
        default:
          return "fas fa-align-left";
      }
    }
    return "fas fa-align-left"; // Default to left if no style is set
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle content-button"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="Text Styles"
        >
          <i className="fas fa-bold"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                onUpdateStyle({
                  fontWeight: "bold",
                })
              }
            >
              <i className="fas fa-bold"></i>
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                onUpdateStyle({
                  fontStyle: "italic",
                })
              }
            >
              <i className="fas fa-italic"></i>
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                onUpdateStyle({
                  textDecoration: "underline",
                })
              }
            >
              <i className="fas fa-underline"></i>
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() =>
                onUpdateStyle({
                  textDecoration: "line-through",
                })
              }
            >
              <i className="fas fa-strikethrough"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle content-button"
          type="button"
          title="Text Alignment"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className={getTextAlignIcon(content.styles?.textAlign)}></i>
        </button>
        <ul className="dropdown-menu">
          {textAlignOptions.map((option) => (
            <li key={option.value}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => onUpdateStyle({ textAlign: option.value })}
              >
                <i className={getTextAlignIcon(option.value)}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle content-button"
          type="button"
          title="Font Family"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-font"></i>
        </button>
        <ul className="dropdown-menu">
          {fontFamilyOptions.map((option) => (
            <li key={option.value}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => onUpdateStyle({ fontFamily: option.value })}
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
          title="Font Size"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-text-height"></i>
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
          title="Line Height"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-arrows-alt-v"></i>
        </button>
        <ul className="dropdown-menu">
          {lineHeightOptions.map((option) => (
            <li key={option.value}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => onUpdateStyle({ lineHeight: option.value })}
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="btn btn-secondary content-button"
        onClick={() => onReduceIndent()}
        title="Decrease Indent"
        aria-label="Decrease Indent"
      >
        <i className="fas fa-outdent"></i>
      </button>
      <button
        className="btn btn-secondary content-button"
        onClick={() => onAddIndent()}
        title="Increase Indent"
        aria-label="Increase Indent"
      >
        <i className="fas fa-indent"></i>
      </button>
    </>
  );
}
