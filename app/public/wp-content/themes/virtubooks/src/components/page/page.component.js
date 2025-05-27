import MultilineInput from "../multiline/multiline.component";
import React, { useState } from "react";
import "./page.styles.css";

export default function PageComponent({
  page,
  className,
  handleAddContent,
  handleUpdateContent,
  handleDeleteContent,
  isReadOnly = false,
}) {
  // ...existing code...

  // Track which content index is hovered or focused
  const [activeIdx, setActiveIdx] = useState(null);

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
              onFocus={() => setActiveIdx(idx)}
              onBlur={() => setActiveIdx(null)}
            />
          );
        } else if (content.type === "paragraph") {
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <MultilineInput
                value={content.value}
                className={content.type}
                style={content.styles}
                onChange={(value) => handleInputChange(idx, value)}
                onFocus={() => setActiveIdx(idx)}
                onBlur={() => setActiveIdx(null)}
              />
              {activeIdx === idx && (
                <div className="d-flex align-items-center gap-2 justify-content-start">
                  <button
                    className="btn btn-primary content-button"
                    onClick={() => handleAddContent(page.id, idx)}
                    aria-label="Add Content"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                  <button
                    className="btn btn-danger content-button"
                    onClick={() => handleDeleteContent(page.id, idx)}
                    aria-label="Delete Content"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              )}
            </div>
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
