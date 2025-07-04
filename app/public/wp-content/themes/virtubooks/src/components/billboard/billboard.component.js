import NotebookCover from "../notebook-cover/notebook-cover.component";
import { defaultCoverImageURL } from "../../config/default";
import NotebookService from "../../services/notebookService";
import AuthService from "../../services/authService";
import React, { useState, useEffect } from "react";
import { newNotebook } from "../../config/default";

export default function Billboard() {
  const notebookService = new NotebookService();
  const authService = new AuthService();
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    // Fetch the current user
    const currentUser = await authService.getUser();
    setUser(currentUser);

    async function fetchRecentNotebooks() {
      try {
        const notebooks = await notebookService.fetchFilteredNotebooks({
          ...(currentUser ? { userId: currentUser.id } : {}),
          s_updatedAt: "desc",
          limit: 6,
        });
        setNotebooks(notebooks);
      } catch (error) {
        console.error("Failed to fetch recent notebooks:", error);
      } finally {
        setLoading(false);
      }
    }
    await fetchRecentNotebooks();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {loading ? (
            <div className="loading-spinner">
              <i className="icon icon-spinner"></i> Loading...
            </div>
          ) : (
            <>
              {notebooks.length > 0 && (
                <button className="prev slick-arrow">
                  <i className="icon icon-arrow-left"></i>
                </button>
              )}

              <div className="main-slider pattern-overlay">
                {notebooks.length > 0 ? (
                  notebooks.map((notebook) => (
                    <div className="slider-item" key={notebook.id}>
                      <div className="banner-content">
                        <h2 className="banner-title">{notebook.title}</h2>
                        <div className="banner-author">
                          By {notebook.author}
                        </div>
                        <p>{notebook.description}</p>
                        <div className="btn-wrap">
                          <a
                            href={`/notebooks/${notebook.id}`}
                            className="btn btn-outline-accent btn-accent-arrow"
                          >
                            {notebook.userId === String(user?.id)
                              ? "Continue Writing"
                              : "Read Notebook"}
                            <i className="icon icon-ns-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                          <NotebookCover
                            notebook={notebook}
                            className="book-small"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="slider-item" key={newNotebook.id}>
                    <div className="banner-content">
                      <h2 className="banner-title">{newNotebook.title}</h2>
                      <div className="banner-author">
                        By {newNotebook.author}
                      </div>
                      <p>{newNotebook.description}</p>
                      <div className="btn-wrap">
                        <a
                          href="/notebooks/create"
                          className="btn btn-outline-accent btn-accent-arrow"
                        >
                          New Notebook
                          <i className="icon icon-ns-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center">
                        <NotebookCover
                          notebook={newNotebook}
                          className="book-small"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {notebooks.length > 0 && (
                <button className="next slick-arrow">
                  <i className="icon icon-arrow-right"></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
