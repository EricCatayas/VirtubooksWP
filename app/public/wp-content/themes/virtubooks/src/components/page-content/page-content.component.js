import React, { useState } from "react";
import MultilineInput from "../multiline/multiline.component";
import ImageContent from "../image-content/image-content.component";
import ContentToolbar from "../content-toolbar/content-toolbar.component";
import TextToolbarControls from "../toolbar-controls/text-controls.component";
import ImageToolbarControls from "../toolbar-controls/image-controls.component";

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
  onSetImage,
  onRemoveImage,
}) {
  let contentNode = null;
  let toolbarNode = null;
  const [isFocused, setFocused] = useState(false);
  const headingfontSizes = [
    { label: "1", value: "1.1rem" },
    { label: "1.2", value: "1.2rem" },
    { label: "1.3", value: "1.3rem" },
    { label: "1.4", value: "1.4rem" },
    { label: "1.5", value: "1.5rem" },
    { label: "1.6", value: "1.6rem" },
    { label: "1.7", value: "1.7rem" },
    { label: "1.8", value: "1.8rem" },
    { label: "2", value: "2rem" },
    { label: "2.5", value: "2.5rem" },
    { label: "3", value: "3rem" },
    { label: "4", value: "4rem" },
  ];

  switch (content.type) {
    case "heading":
      contentNode = (
        <MultilineInput
          value={content.value}
          className={content.type}
          style={content.styles}
          isReadOnly={isReadOnly}
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
          isReadOnly={isReadOnly}
          onChange={(value) => onInputChange(value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      );
      break;
    case "image":
      contentNode = <ImageContent content={content} />;
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
            isReadOnly={isReadOnly}
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
              content={content}
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
          toolbarControls={
            <ImageToolbarControls
              content={content}
              onUpdateStyle={(style) => onUpdateStyle(style)}
              onSelectImage={() => onSetImage()}
              onRemoveImage={() => onRemoveImage()}
            />
          }
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
              content={content}
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
