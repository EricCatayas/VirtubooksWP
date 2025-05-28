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

  const handleMoveUp = (contentIdx) => {
    if (contentIdx > 0) {
      const newContents = [...page.contents];
      const temp = newContents[contentIdx - 1];
      newContents[contentIdx - 1] = newContents[contentIdx];
      newContents[contentIdx] = temp;
      handleUpdateContent(contentIdx - 1, newContents[contentIdx - 1]);
      handleUpdateContent(contentIdx, newContents[contentIdx]);
    }
  };

  const handleMoveDown = (contentIdx) => {
    if (contentIdx < page.contents.length - 1) {
      const newContents = [...page.contents];
      const temp = newContents[contentIdx + 1];
      newContents[contentIdx + 1] = newContents[contentIdx];
      newContents[contentIdx] = temp;
      handleUpdateContent(contentIdx + 1, newContents[contentIdx + 1]);
      handleUpdateContent(contentIdx, newContents[contentIdx]);
    }
  };

  const handleImageUpload = (contentIdx, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newContent = {
        value: reader.result,
        type: "image",
        styles: {},
      };
      handleUpdateContent(contentIdx, newContent);
    };
    reader.readAsDataURL(file);
  };

  const handleAddIndent = (contentIdx) => {
    const targetContent = page.contents[contentIdx];
    if (targetContent) {
      const currentStyles = { ...targetContent.styles };
      if (currentStyles.marginLeft) {
        const indentValue = parseInt(currentStyles.marginLeft, 10);
        currentStyles.marginLeft = `${indentValue + 20}px`;
      } else {
        currentStyles.marginLeft = "20px";
      }
      handleUpdateStyle(contentIdx, currentStyles);
    }
  };

  const handleReduceIndent = (contentIdx) => {
    const targetContent = page.contents[contentIdx];
    if (targetContent) {
      const currentStyles = { ...targetContent.styles };
      if (currentStyles.marginLeft) {
        const indentValue = parseInt(currentStyles.marginLeft, 10);
        if (indentValue > 20) {
          currentStyles.marginLeft = `${indentValue - 20}px`;
        } else {
          currentStyles.marginLeft = "0px";
        }
      }
      handleUpdateStyle(contentIdx, currentStyles);
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
          content={content}
          isReadOnly={isReadOnly}
          onInputChange={(value) => handleInputChange(idx, value)}
          onAddContent={(type) => handleAddContent(idx, type)}
          onDeleteContent={() => handleDeleteContent(idx)}
          onUpdateStyle={(style) => handleUpdateStyle(idx, style)}
          onMoveUp={() => handleMoveUp(idx)}
          onMoveDown={() => handleMoveDown(idx)}
          onImageUpload={(file) => handleImageUpload(idx, file)}
          onAddIndent={() => handleAddIndent(idx)}
          onReduceIndent={() => handleReduceIndent(idx)}
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
