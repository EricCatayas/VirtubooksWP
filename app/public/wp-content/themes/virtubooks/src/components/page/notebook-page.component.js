import PageContent from "../page-content/page-content.component";
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
  const pageId = page.id;

  // todo: content type
  const handleAddContent = (contentIdx, type) => {
    const newContent = { value: "", type };
    dispatch(addContent({ pageId, contentIdx, newContent }));
  };

  const handleUpdateContent = (contentIdx, newContent) => {
    dispatch(updateContent({ pageId, contentIdx, newContent }));
  };

  const handleDeleteContent = (contentIdx) => {
    dispatch(deleteContent({ pageId, contentIdx }));
  };

  const handleInputChange = (contentIdx, newValue) => {
    const targetContent = page.contents[contentIdx];
    if (targetContent) {
      const updatedContent = {
        ...targetContent,
        value: newValue,
      };
      handleUpdateContent(contentIdx, updatedContent);
    }
  };

  const handleUpdateStyle = (contentIdx, style) => {
    const targetContent = page.contents[contentIdx];
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
      handleUpdateContent(contentIdx, updatedContent);
    }
  };

  return (
    <div className={className}>
      {page.header && (
        <header>
          <h6>{page.header}</h6>
        </header>
      )}
      {page.contents.map((content, idx) => (
        <PageContent
          key={idx}
          idx={idx}
          content={content}
          isReadOnly={isReadOnly}
          handleInputChange={handleInputChange}
          handleAddContent={handleAddContent}
          handleDeleteContent={handleDeleteContent}
          handleUpdateStyle={handleUpdateStyle}
        />
      ))}
      {page.contents.length === 0 && !isReadOnly && (
        <button
          className="btn btn-secondary add-content-button"
          onClick={() => handleAddContent(page.id, 0)}
        >
          Add Content
        </button>
      )}
      {page.footer && (
        <footer>
          <h6>{page.footer}</h6>
        </footer>
      )}
    </div>
  );
}
