import React, { useState } from "react";
import MultilineInput from "../multiline/multiline.component";
import ContentToolbar from "../content-toolbar/content-toolbar.component";

export default function PageContent({
  idx,
  content,
  isReadOnly,
  handleInputChange,
  handleAddContent,
  handleDeleteContent,
  handleUpdateStyle,
}) {
  let contentNode = null;
  const [isFocused, setFocused] = useState(false);

  switch (content.type) {
    case "heading":
      contentNode = (
        <MultilineInput
          value={content.value}
          className={content.type}
          style={content.styles}
          onChange={(value) => handleInputChange(idx, value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      );
      break;
    case "paragraph":
      contentNode = (
        <MultilineInput
          value={content.value}
          className={content.type}
          style={content.styles}
          onChange={(value) => handleInputChange(idx, value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      );
      break;
    case "image":
      contentNode = (
        <img
          src={content.value}
          alt="User uploaded content"
          style={content.styles}
          onClick={() => {
            if (!isReadOnly) {
              // Handle image click for editing or other actions
            }
          }}
        />
      );
      break;
    case "quote":
      contentNode = (
        <blockquote
          style={content.styles}
          onClick={() => {
            if (!isReadOnly) {
              // Handle quote click for editing or other actions
            }
          }}
        >
          {content.value}
        </blockquote>
      );
      break;
    case "list":
      contentNode = (
        <ul style={content.styles}>
          {content.value.map((item, itemIdx) => (
            <li key={itemIdx}>{item}</li>
          ))}
        </ul>
      );
      break;
    case "code":
      contentNode = (
        <pre style={content.styles}>
          <code>{content.value}</code>
        </pre>
      );
      break;
    default:
      contentNode = (
        <div className="error">
          <p>Unknown content type: {content.type}</p>
        </div>
      );
  }

  const headingfontSizes = [
    { label: "Small", value: "1.5rem" },
    { label: "Medium", value: "2rem" },
    { label: "Large", value: "2.5rem" },
    { label: "XL", value: "3rem" },
    { label: "XXL", value: "4rem" },
    { label: "XXXL", value: "5rem" },
  ];

  return (
    <section
      key={idx}
      className={`content-${content.type}`}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      {contentNode}
      {isFocused && !isReadOnly && (
        <ContentToolbar
          content={content}
          onAddContent={(type) => handleAddContent(idx, type)}
          onDeleteContent={() => handleDeleteContent(idx)}
          onUpdateStyle={(style) => handleUpdateStyle(idx, style)}
          fontSizeOptions={
            content.type === "heading" ? headingfontSizes : undefined
          }
        />
      )}
    </section>
  );
}
