import PageContent from "../page-content/page-content.component";
import AddContentToolbar from "../content-toolbar/add-content-toolbar.component";
import PageToolbar from "../page-toolbar/page-toolbar.component";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  insertBlankPage,
  duplicatePage,
  deletePage,
  setStartPage,
  setEndPage,
  updatePageNumbering,
  addContent,
  deleteContent,
  updateContent,
} from "../../features/notebookSlice";
import "./notebook-page.styles.css";

export default function NotebookPage({
  page,
  pageIdx,
  className,
  styles = {},
  isReadOnly = false,
}) {
  const dispatch = useDispatch();
  const pageId = page.id;
  const [isFocused, setIsFocused] = useState(false);
  const isFrontPage = pageIdx % 2 === 0;

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
  const handleDuplicatePage = () => {
    dispatch(duplicatePage({ pageId }));
  };
  const handleBookmarkPage = () => {
    // save to local storage
    // e.g., url/notebook/slug/page
    console.log("Bookmark Page");
  };
  const handleSetStartPage = () => {
    dispatch(setStartPage({ pageId }));
    dispatch(updatePageNumbering());
  };
  const handleSetEndPage = () => {
    dispatch(setEndPage({ pageId }));
    dispatch(updatePageNumbering());
  };
  const handleSetNotebookSettings = () => {
    console.log("Set Notebook Settings");
    // navigate to notebook settings page in new tab
  };
  const handleSetBackgroundImage = () => {
    // open image uploads modal
    // only authorized users can access this
    console.log("Set Background Image");
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
            onDuplicate={handleDuplicatePage}
            onBookmark={handleBookmarkPage}
            onSetStartPage={handleSetStartPage}
            onSetEndPage={handleSetEndPage}
            onSetNotebookSettings={handleSetNotebookSettings}
            onSetBackgroundImage={handleSetBackgroundImage}
            style={
              isFrontPage
                ? {}
                : { left: 10, transform: "translateZ(0) rotateY(180deg)" }
            }
          />
        </div>
      )}
      <div
        className={className} // e.g. front, or back
        style={{
          ...(page.backgroundImageURL
            ? {
                backgroundImage: `url(${page.backgroundImageURL})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : {}),
          ...styles,
          ...(page.styles || {}),
        }}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        onClick={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <section className="page-header">
          {/* {page.header && ( <PageHeader /> )}  */}
        </section>
        <section className="page-body">
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
        </section>
        <section className="page-footer">
          {/* {page.footer && ( <PageFooter /> )} */}
          {page.pageNumber && (
            <div
              className="page-number"
              style={{
                display: "flex",
                justifyContent: isFrontPage ? "flex-end" : "flex-start",
              }}
            >
              <span>{page.pageNumber}</span>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
