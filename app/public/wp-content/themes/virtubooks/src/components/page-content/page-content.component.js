import React, { useState } from "react";
import MultilineInput from "../multiline/multiline.component";
import ContentToolbar from "../content-toolbar/content-toolbar.component";
import TextToolbarControls from "../toolbar-controls/text-controls.component";

export default function PageContent({
  content,
  isReadOnly,
  onInputChange,
  onAddContent,
  onDeleteContent,
  onMoveUp,
  onMoveDown,
  onUpdateStyle,
  onAddIndent,
  onReduceIndent,
  onImageUpload,
}) {
  let contentNode = null;
  let toolbarNode = null;
  const [isFocused, setFocused] = useState(false);
  const headingfontSizes = [
    { label: "Small", value: "1.5rem" },
    { label: "Medium", value: "2rem" },
    { label: "Large", value: "2.5rem" },
    { label: "XL", value: "3rem" },
    { label: "XXL", value: "4rem" },
    { label: "XXXL", value: "5rem" },
  ];

  switch (content.type) {
    case "heading":
      contentNode = (
        <MultilineInput
          value={content.value}
          className={content.type}
          style={content.styles}
          onChange={(value) => onInputChange(value)}
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
          onChange={(value) => onInputChange(value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      );
      break;
    case "image":
      contentNode = content.value ? (
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
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onImageUpload(e.target.files[0]);
            }
          }}
          disabled={isReadOnly}
        />
      );
      break;
    case "quote":
      contentNode =
        content.value && !isFocused ? (
          <blockquote
            className={content.type}
            style={content.styles}
            onClick={() => {
              if (!isReadOnly) {
                // Handle quote click for editing or other actions
              }
            }}
          >
            {content.value}
          </blockquote>
        ) : (
          <MultilineInput
            value={content.value}
            className={content.type}
            style={content.styles}
            onChange={(value) => onInputChange(value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
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
    default:
      contentNode = (
        <div className="error">
          <p>Unknown content type: {content.type}</p>
        </div>
      );
  }

  switch (content.type) {
    case "heading":
      toolbarNode = (
        <ContentToolbar
          content={content}
          onAddContent={(type) => onAddContent(type)}
          onDeleteContent={() => onDeleteContent()}
          onMoveUp={() => onMoveUp()}
          onMoveDown={() => onMoveDown()}
          toolbarControls={
            <TextToolbarControls
              fontSizeOptions={headingfontSizes}
              onUpdateStyle={(style) => onUpdateStyle(style)}
              onAddIndent={onAddIndent}
              onReduceIndent={onReduceIndent}
            />
          }
        />
      );
      break;
    case "image":
      toolbarNode = (
        <ContentToolbar
          content={content}
          onAddContent={(type) => onAddContent(type)}
          onDeleteContent={() => onDeleteContent()}
          onMoveUp={() => onMoveUp()}
          onMoveDown={() => onMoveDown()}
        />
      );
      break;
    default:
      toolbarNode = (
        <ContentToolbar
          content={content}
          onAddContent={(type) => onAddContent(type)}
          onDeleteContent={() => onDeleteContent()}
          onMoveUp={() => onMoveUp()}
          onMoveDown={() => onMoveDown()}
          toolbarControls={
            <TextToolbarControls
              onUpdateStyle={(style) => onUpdateStyle(style)}
              onAddIndent={onAddIndent}
              onReduceIndent={onReduceIndent}
            />
          }
        />
      );
  }

  return (
    <section
      className={`section-${content.type}`}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      {contentNode}
      {isFocused && !isReadOnly && toolbarNode}
    </section>
  );
}
