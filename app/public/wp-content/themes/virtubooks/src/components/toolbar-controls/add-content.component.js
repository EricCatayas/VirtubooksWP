import React from "react";
import { contentTypeOptions } from "../../config/ui";

export default function AddContentControl({ onAddContent }) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-small btn-outline-accent borderless my-0 dropdown-toggle my-0"
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
              className="dropdown-item text-accent"
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
