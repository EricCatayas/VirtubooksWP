import React from "react";
import "./page.styles.css";

export default function PageComponent({ page, className, handleInputChange }) {
  // Determine the class for the page element

  return (
    <div className={className}>
      {page.header && (
        <header>
          <h6>{page.header}</h6>
        </header>
      )}
      {page.contents.map((content, idx) => {
        if (content.type === "title") {
          return <h1 key={idx}>{content.value}</h1>;
        } else if (content.type === "paragraph") {
          return (
            <input
              key={idx}
              type="text"
              value={content.value}
              onChange={(e) => handleInputChange(page.id, idx, e.target.value)}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
