import NotebookComponent from "../notebook/notebook.component";
import TextToolbarControls from "../toolbar-controls/text-controls.component";
import LayoutToolbarControls from "../toolbar-controls/layout-controls.component";
import ImageUploadsModal from "../image-uploads/image-uploads-modal.component";
import NotebookService from "../../services/notebookService";
import AuthService from "../../services/authService";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setNotebookState,
  resetNotebookState,
  setPageBackgroundImage,
} from "../../features/notebookSlice";
import { aspectRatioOptions, visibilityOptions } from "../../config/ui";
import "./notebook-editor.styles.css";

export default function NotebookEditor() {
  const dispatch = useDispatch();
  const { id: notebookId } = useParams();
  const notebook = useSelector((state) => state.notebook);
  const hasChanges = useSelector((state) => state.notebook.hasChanges);
  const imageSelector = useSelector((state) => state.imageSelector);
  const selectedImage = imageSelector.selectedImage;
  const isImageSelectorOpen = imageSelector.isOpen;

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const notebookService = new NotebookService();
  const authService = new AuthService();

  useEffect(async () => {
    // dispatch(resetNotebookState());
    try {
      const fetchedNotebook = await notebookService.fetchNotebook(notebookId);
      const currentUser = await authService.getUser();

      checkNotebookOwnership(fetchedNotebook, currentUser);
      dispatch(setNotebookState(fetchedNotebook));
    } catch (error) {
      alert("Failed to load notebook: " + error.message);
    }
    // todo: if current user is not the owner, set read-only mode and isOwner to false
  }, [dispatch, notebookId]);

  const checkNotebookOwnership = (notebook, currentUser) => {
    if (currentUser && notebook.userId === String(currentUser.id)) {
      setIsOwner(true);
      setIsReadOnly(false);
    } else {
      setIsOwner(false);
      setIsReadOnly(true);
    }
  };

  useEffect(() => {
    if (selectedImage && selectedImage.type === "background") {
      const imageURL = selectedImage.imageURL;
      dispatch(
        setPageBackgroundImage({
          pageId: notebook.currentPageId,
          imageURL,
        })
      );
    }
  }, [dispatch, selectedImage]);

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

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this notebook?")) {
      try {
        await notebookService.deleteNotebook(notebook.id);
        dispatch(resetNotebookState());
        alert("Notebook deleted successfully!");
        window.location.href = "/notebooks/my-notebooks";
      } catch (error) {
        console.error("Error deleting notebook:", error);
        alert("Failed to delete notebook. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    try {
      // todo: replace with actual token retrieval logic
      if (isOwner) {
        const updatedNotebook = await notebookService.updateNotebook(notebook);
        // dispatch(setNotebookState(updatedNotebook));
        alert("Notebook saved successfully!");
      }
    } catch (error) {
      console.error("Error saving notebook:", error);
      alert("Failed to save notebook. Please try again.");
    }
  };

  const handleRevertChanges = () => {
    if (confirm("Are you sure you want to revert changes?")) {
      window.location.reload();
    }
  };

  return (
    <>
      <div className="notebook-editor">
        <div className="top-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
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
                                handleUpdateField("title", e.target.value);
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
                                handleUpdateField(
                                  "description",
                                  e.target.value
                                );
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
                                handleUpdateField("author", e.target.value);
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
                              value={notebook.visibility || ""}
                              onChange={(e) => {
                                handleUpdateField("visibility", e.target.value);
                              }}
                              style={{ fontSize: "0.95em" }}
                              disabled={isReadOnly}
                              required
                            >
                              {visibilityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
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
                                handleUpdateField(
                                  "aspectRatio",
                                  e.target.value
                                );
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
                          <div className="mb-2">
                            <label
                              htmlFor="tags"
                              className="form-label"
                              style={{ fontSize: "0.95em" }}
                            >
                              Tags
                            </label>
                            <input
                              type="text"
                              id="tags"
                              className="form-control form-control-sm"
                              value={notebook.tags || ""}
                              onChange={(e) => {
                                handleUpdateField("tags", e.target.value);
                              }}
                              style={{ fontSize: "0.95em" }}
                              disabled={isReadOnly}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-small btn-outline-accent borderless my-0"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Close
                          </button>
                          {isOwner && (
                            <button
                              type="button"
                              className="btn btn-small btn-outline-danger borderless"
                              onClick={handleDelete}
                            >
                              Delete
                            </button>
                          )}
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
              {/* <div className="col-md-5">
                <div className="center-element">
                      <div className="d-flex align-items-center gap-2 justify-content-end">
                      </div>
                </div>
              </div> */}
              <div className="col-md-4">
                <div className="right-element">
                  <div className="d-flex align-items-center gap-2 justify-content-end">
                    {isOwner && hasChanges && (
                      <>
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
                      </>
                    )}
                    <button
                      className="btn btn-small btn-outline-accent borderless my-0"
                      title="Toggle Read-Only Mode"
                      onClick={() => isOwner && toggleReadOnly()}
                    >
                      {isReadOnly ? (
                        <label htmlFor="readOnlyToggle" className="vb-label">
                          <i className="fa-regular fa-eye"></i> Read-Only
                        </label>
                      ) : (
                        <label htmlFor="readOnlyToggle" className="vb-label">
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
      {!isReadOnly && isImageSelectorOpen && <ImageUploadsModal />}
      <NotebookComponent notebook={notebook} isReadOnly={isReadOnly} />
    </>
  );
}
