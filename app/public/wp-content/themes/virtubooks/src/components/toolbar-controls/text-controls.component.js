import React from "react";
import {
  defaultfontSizeOptions,
  fontFamilyOptions,
  lineHeightOptions,
} from "../../config/ui";

export default function TextToolbarControls({
  onUpdateStyle,
  onAddIndent,
  onReduceIndent,
  fontSizeOptions = defaultfontSizeOptions,
}) {
  return (
    <>
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
        onClick={() => onAddIndent()}
        aria-label="Increase Indent"
      >
        <i className="fas fa-indent"></i>
      </button>
      <button
        className="btn btn-secondary content-button"
        onClick={() => onReduceIndent()}
        aria-label="Decrease Indent"
      >
        <i className="fas fa-outdent"></i>
      </button>
    </>
  );
}
