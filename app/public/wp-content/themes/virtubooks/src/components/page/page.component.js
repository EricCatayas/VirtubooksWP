import React from "react";
import "./page.styles.css";
import MultilineInput from "../multiline/multiline.component";

export default function PageComponent({
  page,
  className,
  handleInputChange,
  handleAddContent,
}) {
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
          return (
            <>
              <MultilineInput
                value={content.value}
                onChange={(value) => handleInputChange(page.id, idx, value)}
                className="title-input"
              />
            </>
          );
        } else if (content.type === "paragraph") {
          return (
            <>
              <MultilineInput
                value={content.value}
                onChange={(value) => handleInputChange(page.id, idx, value)}
                className="paragraph-input"
              />
            </>
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
