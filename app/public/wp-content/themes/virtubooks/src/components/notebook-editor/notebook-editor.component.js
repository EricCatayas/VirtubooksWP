import NotebookComponent from "../notebook/notebook.component";
import TextToolbarControls from "../toolbar-controls/text-controls.component";
import LayoutToolbarControls from "../toolbar-controls/layout-controls.component";
import NotebookService from "../../services/notebookService";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setNotebookState } from "../../features/notebookSlice";
import { aspectRatioOptions, visibilityOptions } from "../../config/ui";
import "./notebook-editor.styles.css";

export default function NotebookEditor() {
  const dispatch = useDispatch();
  const { id: notebookId } = useParams();
  const notebook = useSelector((state) => state.notebook);
  const hasChanges = useSelector((state) => state.notebook.hasChanges);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const notebookService = new NotebookService();

  useEffect(async () => {
    const fetchedNotebook = await notebookService.getNotebook(notebookId);
    dispatch(setNotebookState(fetchedNotebook));
    // todo: if current user is not the owner, set read-only mode and isOwner to false
  }, [dispatch, notebookId]);

  const toggleReadOnly = () => {
    setIsReadOnly((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleUpdateField = (field, value) => {
    if (!isReadOnly) {
      dispatch(setNotebookState({ ...notebook, [field]: value }));
    }
  };

  const handleUpdateStyle = (style) => {
    const currentStyles = { ...(notebook.styles || {}) };
    Object.entries(style).forEach(([key, value]) => {
      if (currentStyles[key] === value) {
        delete currentStyles[key];
      } else {
        currentStyles[key] = value;
      }
    });
    dispatch(setNotebookState({ ...notebook, styles: currentStyles }));
  };

  const handleSave = async () => {
    try {
      await notebookService.updateNotebook(notebook);
      alert("Notebook saved successfully!");
    } catch (error) {
      console.error("Error saving notebook:", error);
      alert("Failed to save notebook. Please try again.");
    }
  };

  const handleRevertChanges = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="notebook-editor">
        <div className="top-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="left-element">
                  <div className="d-flex align-items-center gap-2 justify-content-start">
                    <button
                      className="btn btn-small btn-outline-accent borderless my-0"
                      onClick={toggleDropdown}
                    >
                      <i className="fa-solid fa-book"></i>
                    </button>
                    {/* form */}
                    {isDropdownOpen && (
                      <div
                        className="notebook-form"
                        onBlur={() => setIsDropdownOpen(false)}
                      >
                        <form className="mb-0">
                          <div className="mb-2">
                            <label
                              htmlFor="title"
                              className="form-label"
                              style={{ fontSize: "0.95em" }}
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              className="form-control form-control-sm"
                              value={notebook.title || ""}
                              onChange={(e) => {
                                if (!isReadOnly) {
                                  handleUpdateField("title", e.target.value);
                                }
                              }}
                              style={{ fontSize: "0.95em" }}
                              disabled={isReadOnly}
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="description"
                              className="form-label"
                              style={{ fontSize: "0.95em" }}
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              className="form-control form-control-sm"
                              value={notebook.description || ""}
                              onChange={(e) => {
                                if (!isReadOnly) {
                                  handleUpdateField(
                                    "description",
                                    e.target.value
                                  );
                                }
                              }}
                              style={{ fontSize: "0.95em" }}
                              rows={2}
                              disabled={isReadOnly}
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="author"
                              className="form-label"
                              style={{ fontSize: "0.95em" }}
                            >
                              Author
                            </label>
                            <input
                              type="text"
                              id="author"
                              className="form-control form-control-sm"
                              value={notebook.author || ""}
                              onChange={(e) => {
                                if (!isReadOnly) {
                                  handleUpdateField("author", e.target.value);
                                }
                              }}
                              style={{ fontSize: "0.95em" }}
                              disabled={isReadOnly}
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="visibility"
                              className="form-label"
                              style={{ fontSize: "0.95em" }}
                            >
                              Visibility
                            </label>
                            <select
                              id="visibility"
                              className="form-select form-select-sm"
                              value={notebook.visibillity || ""}
                              onChange={(e) => {
                                if (!isReadOnly) {
                                  handleUpdateField(
                                    "visibility",
                                    e.target.value
                                  );
                                }
                              }}
                              style={{ fontSize: "0.95em" }}
                              disabled={isReadOnly}
                            >
                              <option value="">Select visibility</option>
                              {visibilityOptions.map((option) => (
                                <option
                                  key={option.value}
                                  value={option.value}
                                  selected={
                                    option.value === notebook.visibility
                                  }
                                >
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="aspectRatio"
                              className="form-label"
                              style={{ fontSize: "0.95em" }}
                            >
                              Aspect Ratio
                            </label>
                            <select
                              id="aspectRatio"
                              className="form-select form-select-sm"
                              value={notebook.aspectRatio || ""}
                              onChange={(e) => {
                                if (!isReadOnly) {
                                  handleUpdateField(
                                    "aspectRatio",
                                    e.target.value
                                  );
                                }
                              }}
                              style={{ fontSize: "0.95em" }}
                              disabled={isReadOnly}
                            >
                              <option value="">Select aspect ratio</option>
                              {aspectRatioOptions.map((option) => (
                                <option
                                  key={option.value}
                                  value={option.value}
                                  selected={
                                    option.value === notebook.aspectRatio
                                  }
                                >
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            type="button"
                            className="btn btn-small btn-outline-accent borderless my-0"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Close
                          </button>
                        </form>
                      </div>
                    )}
                    {/* common controls */}
                    {!isReadOnly && (
                      <>
                        <TextToolbarControls
                          content={notebook}
                          onUpdateStyle={(style) => handleUpdateStyle(style)}
                          showIndentButtons={false}
                        />
                        <LayoutToolbarControls
                          content={notebook}
                          onUpdateStyle={(style) => handleUpdateStyle(style)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="center-element">
                  {hasChanges && (
                    <div className="d-flex align-items-center gap-2 justify-content-end">
                      <button
                        className="btn btn-small btn-outline-accent borderless my-0"
                        onClick={handleSave}
                        title="Save Changes"
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button
                        className="btn btn-small btn-outline-accent borderless my-0"
                        onClick={handleRevertChanges}
                        title="Revert Changes"
                      >
                        <i class="fa-solid fa-rotate-left"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-1">
                <div className="right-element">
                  <div className="d-flex align-items-center gap-2 justify-content-end">
                    <button
                      className="btn btn-small btn-outline-accent borderless my-0"
                      title="Toggle Read-Only Mode"
                      onClick={() => isOwner && toggleReadOnly()}
                    >
                      {isReadOnly ? (
                        <label
                          htmlFor="readOnlyToggle"
                          style={{ marginBottom: "0", cursor: "pointer" }}
                        >
                          <i className="fa-regular fa-eye"></i> Read-Only
                        </label>
                      ) : (
                        <label
                          htmlFor="readOnlyToggle"
                          style={{ marginBottom: "0", cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-pencil"></i> Edit Mode
                        </label>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotebookComponent notebook={notebook} isReadOnly={isReadOnly} />
    </>
  );
}
