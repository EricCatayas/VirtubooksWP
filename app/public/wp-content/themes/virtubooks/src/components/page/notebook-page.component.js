import PageContent from "../page-content/page-content.component";
import PageToolbar from "../page-toolbar/page-toolbar.component";
import AddContentToolbar from "../content-toolbar/add-content-toolbar.component";
import AddContentControl from "../toolbar-controls/add-content.component";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  insertBlankPage,
  duplicatePage,
  deletePage,
  setPageState,
  setStartPage,
  setEndPage,
  updatePageNumbering,
  addContent,
  deleteContent,
  updateContent,
} from "../../features/notebookSlice";
import { toggleImageSelector } from "../../features/imageSelectorSlice";
import "./notebook-page.styles.css";

export default function NotebookPage({
  page,
  pageIdx,
  className,
  onNextPage,
  onPrevPage,
  styles = {},
  isReadOnly = true,
}) {
  const dispatch = useDispatch();
  const pageId = page.id;
  const [isFocused, setIsFocused] = useState(false);
  const [activeContentIdx, setActiveContentIdx] = useState(null);
  const imageSelector = useSelector((state) => state.imageSelector);
  const selectedImage = imageSelector.selectedImage;
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
  };
  const handleSetBackgroundImage = () => {
    dispatch(toggleImageSelector({ type: "background" }));
  };

  const handleSetContentImage = (contentIdx) => {
    setActiveContentIdx(contentIdx);
    dispatch(toggleImageSelector({ type: "content" }));
  };

  const handleRemoveContentImage = (contentIdx) => {
    const targetContent = page.contents[contentIdx];
    if (targetContent && targetContent.type === "image") {
      const updatedContent = {
        ...targetContent,
        value: "",
      };
      handleUpdateContent(contentIdx, updatedContent);
    }
  };

  const handleOnFocus = () => {
    setIsFocused(true);
    dispatch(setCurrentPage({ pageId }));
  };

  useEffect(() => {
    if (selectedImage && selectedImage.type === "content") {
      const imageURL = selectedImage.imageURL;
      if (activeContentIdx !== null) {
        const targetContent = page.contents[activeContentIdx];
        if (targetContent && targetContent.type === "image") {
          const updatedContent = {
            ...targetContent,
            value: imageURL,
          };
          handleUpdateContent(activeContentIdx, updatedContent);
        }
      }
    }
  }, [dispatch, selectedImage]);

  return (
    <>
      {isFocused && !isReadOnly && (
        <div
          onMouseEnter={() => handleOnFocus()}
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
                : { right: 10, transform: "translateZ(0) rotateY(180deg)" }
            }
            toolbarControls={
              page.contents.length === 0 && (
                <AddContentControl
                  onAddContent={(type) => handleAddContent(0, type)}
                />
              )
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
        onMouseEnter={() => handleOnFocus()}
        onMouseLeave={() => setIsFocused(false)}
        onClick={() => handleOnFocus()}
        onBlur={() => setIsFocused(false)}
      >
        <section className="page-header">
          {/* {page.header && ( <PageHeader /> )}  */}
          <div
            className="corner"
            style={{
              display: "flex",
              justifyContent: isFrontPage ? "flex-end" : "flex-start",
            }}
          ></div>
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
              onAddIndent={() => handleAddIndent(idx)}
              onReduceIndent={() => handleReduceIndent(idx)}
              onSetImage={() => handleSetContentImage(idx)}
              onRemoveImage={() => handleRemoveContentImage(idx)}
            />
          ))}
        </section>
        <section className="page-footer">
          {/* {page.footer && ( <PageFooter /> )} */}
          {isFocused && (
            <div className="corner">
              {isFrontPage ? (
                <span
                  className="next-page-button"
                  title="Next Page"
                  onClick={onNextPage}
                >
                  <i className="fas fa-arrow-right"></i>
                </span>
              ) : (
                <span
                  className="prev-page-button"
                  title="Previous Page"
                  onClick={onPrevPage}
                >
                  <i className="fas fa-arrow-left"></i>
                </span>
              )}
            </div>
          )}
          {page.pageNumber && (
            <div className="page-number">
              <span>{page.pageNumber}</span>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
