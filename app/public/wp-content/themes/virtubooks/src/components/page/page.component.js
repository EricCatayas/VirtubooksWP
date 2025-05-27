import MultilineInput from "../multiline/multiline.component";
import React, { useState } from "react";
import "./page.styles.css";

export default function PageComponent({
  page,
  className,
  handleUpdateContent,
  isReadOnly = false,
}) {
  // ...existing code...

  const handleInputChange = (contentIdx, newValue) => {
    const targetContent = page.contents[contentIdx];
    if (targetContent) {
      const updatedContent = {
        ...targetContent,
        value: newValue,
      };
      handleUpdateContent(page.id, contentIdx, updatedContent);
    }
  };

  return (
    <div className={className}>
      {page.header && (
        <header>
          <h6>{page.header}</h6>
        </header>
      )}
      {page.contents.map((content, idx) => {
        if (content.type === "title") {
          return (
            <MultilineInput
              key={idx}
              value={content.value}
              className={content.type}
              onChange={(value) => handleInputChange(idx, value)}
            />
          );
        } else if (content.type === "paragraph") {
          return (
            <MultilineInput
              value={content.value}
              className={content.type}
              onChange={(value) => handleInputChange(idx, value)}
            />
          );
        } else {
          // error
          return (
            <div key={idx} className="error">
              <p>Unknown content type: {content.type}</p>
            </div>
          );
        }
      })}
      {page.footer && (
        <footer>
          <h6>{page.footer}</h6>
        </footer>
      )}
    </div>
  );
}
