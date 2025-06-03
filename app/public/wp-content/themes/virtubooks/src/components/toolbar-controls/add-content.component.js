import React from "react";
import { contentTypeOptions } from "../../config/ui";

export default function AddContentControl({ onAddContent }) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle vb-button"
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
  );
}
