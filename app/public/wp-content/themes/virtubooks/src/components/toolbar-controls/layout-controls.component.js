import React from "react";

export default function LayoutToolbarControls({ content, onUpdateStyle }) {
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-small btn-outline-accent borderless my-0 dropdown-toggle my-0 text-strong"
          type="button"
          title="Margins"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Margins
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() => onUpdateStyle({ padding: "2rem" })}
            >
              Normal
            </a>
          </li>
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() => onUpdateStyle({ padding: "1rem" })}
            >
              Narrow
            </a>
          </li>
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() => onUpdateStyle({ padding: "0" })}
            >
              No Margin
            </a>
          </li>
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() => onUpdateStyle({ padding: "5rem" })}
            >
              Wide
            </a>
          </li>
          <li>
            <a
              className="dropdown-item text-accent"
              href="#"
              onClick={() => onUpdateStyle({ padding: "3rem 2.5rem" })}
            >
              Moderate
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
