import PageContent from "../page-content/page-content.component";
import AddContentToolbar from "../content-toolbar/add-content-toolbar.component";
import PageToolbar from "../page-toolbar/page-toolbar.component";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  insertBlankPage,
  deletePage,
  addContent,
  deleteContent,
  updateContent,
} from "../../features/notebookSlice";
import "./notebook-page.styles.css";

export default function NotebookPage({ page, className, isReadOnly = false }) {
  const dispatch = useDispatch();
  const pageId = page.id;
  const [isFocused, setIsFocused] = useState(false);

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

  // If the style already exists and the value is the same, it will be removed.
  const handleUpdateStyle = (contentIdx, style) => {
    const targetContent = page.contents[contentIdx];
    if (targetContent) {
      const currentStyles = { ...(targetContent.styles || {}) };
      Object.entries(style).forEach(([key, value]) => {
        if (currentStyles[key] === value) {
          delete currentStyles[key];
        } else {
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
      let marginLeft = currentStyles.marginLeft || "0px";
      if (marginLeft) {
        const indentValue = parseInt(marginLeft, 10);
        marginLeft = `${indentValue + 20}px`;
      } else {
        marginLeft = "20px";
      }
      handleUpdateStyle(contentIdx, { marginLeft });
    }
  };

  const handleReduceIndent = (contentIdx) => {
    const targetContent = page.contents[contentIdx];
    if (targetContent) {
      const currentStyles = { ...targetContent.styles };
      let marginLeft = currentStyles.marginLeft || "0px";
      if (marginLeft) {
        const indentValue = parseInt(marginLeft, 10);
        if (indentValue > 20) {
          marginLeft = `${indentValue - 20}px`;
        } else {
          marginLeft = "0px";
        }
      }
      handleUpdateStyle(contentIdx, { marginLeft });
    }
  };

  const handleInsertPage = () => {
    dispatch(insertBlankPage({ pageId }));
  };
  const handleDeletePage = () => {
    dispatch(deletePage({ pageId }));
  };
  const handleSetBackgroundImage = () => {
    console.log("Set Background Image");
  };
  const handleSaveChanges = () => {
    console.log("Save Changes");
  };

  return (
    <>
      {isFocused && !isReadOnly && (
        <div
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
        >
          <PageToolbar
            onInsert={handleInsertPage}
            onDelete={handleDeletePage}
            onSetBackgroundImage={handleSetBackgroundImage}
            onSave={handleSaveChanges}
          />
        </div>
      )}
      <div
        className={className} // e.g. front, or back
        style={
          page.backgroundImageURL
            ? {
                backgroundImage: `url(${page.backgroundImageURL})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : undefined
        }
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        onClick={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <div className="page-content">
          <div className="page-header">
            {page.header && (
              <header>
                <h6>{page.header}</h6>
              </header>
            )}
          </div>
          <div className="page-body">
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
            {page.contents.length === 0 && !isReadOnly && isFocused && (
              <AddContentToolbar
                onAddContent={(type) => handleAddContent(0, type)}
                toolbarControls={<div>Add New</div>}
              />
            )}
          </div>
          <div className="page-footer">
            {page.footer && (
              <footer>
                <h6>{page.footer}</h6>
              </footer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
