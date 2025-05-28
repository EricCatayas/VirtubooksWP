import MultilineInput from "../multiline/multiline.component";
import ContentToolbar from "../content-toolbar/content-toolbar.component";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addContent,
  deleteContent,
  updateContent,
} from "../../features/notebookSlice";
import "./notebook-page.styles.css";

export default function NotebookPage({ page, className, isReadOnly = false }) {
  const dispatch = useDispatch();

  // Track which content index is hovered or focused
  const [activeIdx, setActiveIdx] = useState(null);

  // todo: content type
  const handleAddContent = (pageId, contentIdx) => {
    const newContent = { value: "", type: "paragraph" };
    dispatch(addContent({ pageId, contentIdx, newContent }));
  };

  const handleUpdateContent = (pageId, contentIdx, newContent) => {
    dispatch(updateContent({ pageId, contentIdx, newContent }));
  };

  const handleDeleteContent = (pageId, contentIdx) => {
    dispatch(deleteContent({ pageId, contentIdx }));
  };

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

  const handleUpdateStyle = (idx, style) => {
    const targetContent = page.contents[idx];
    if (targetContent) {
      const currentStyles = { ...(targetContent.styles || {}) };
      Object.entries(style).forEach(([key, value]) => {
        // If the key exists and the value is the same, remove it
        if (currentStyles[key] === value) {
          delete currentStyles[key];
        } else {
          // Otherwise, set/update the style
          currentStyles[key] = value;
        }
      });
      const updatedContent = {
        ...targetContent,
        styles: currentStyles,
      };
      handleUpdateContent(page.id, idx, updatedContent);
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
              {activeIdx === idx && !isReadOnly && (
                <ContentToolbar
                  content={content}
                  onAddContent={() => handleAddContent(page.id, idx)}
                  onDeleteContent={() => handleDeleteContent(page.id, idx)}
                  onUpdateStyle={(style) => handleUpdateStyle(idx, style)}
                />
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
