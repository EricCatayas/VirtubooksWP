import NotebookPage from "../page/notebook-page.component";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotebookState } from "../../features/notebookSlice";
import { useParams } from "react-router-dom";
import NotebookService from "../../services/notebookService";
import "./notebook.styles.css";

export default function NotebookComponent() {
  const notebookService = new NotebookService();
  const dispatch = useDispatch();
  const { id } = useParams();
  const notebook = useSelector((state) => state.notebook);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = notebook.pages || [];

  const pageState = (page) =>
    currentPage === page
      ? "active"
      : currentPage > page
      ? "flipped"
      : "inactive";

  useEffect(async () => {
    if (!notebook.id) {
      const fetchedNotebook = await notebookService.getNotebook(id);
      dispatch(setNotebookState(fetchedNotebook));
    }
  }, [dispatch]);

  const pageLength = pages.length;

  function nextPage() {
    if (currentPage === pageLength) {
      return;
    } else {
      setCurrentPage((prevPage) => prevPage + 2);
    }
  }

  function prevPage() {
    if (currentPage === 0) {
      return;
    } else {
      setCurrentPage((prevPage) => prevPage - 2);
    }
  }

  return (
    <div className="book-container">
      <span
        className="arrow-button left-arrow"
        onClick={prevPage}
        aria-label="Previous Page"
      >
        &#8592;
      </span>
      <div className="scene">
        <article className="book" data-aspect-ratio={notebook.aspectRatio}>
          {Array.from({ length: Math.ceil(pages.length / 2) }).map((_, idx) => {
            const pageNum = idx * 2;
            const frontPage = pages[pageNum];
            const backPage = pages[pageNum + 1];
            return (
              <section key={idx} className={`page ${pageState(pageNum)}`}>
                {frontPage && (
                  <NotebookPage
                    page={frontPage}
                    pageIdx={pageNum}
                    styles={notebook.styles}
                    className={"front"}
                  />
                )}
                {backPage && (
                  <NotebookPage
                    page={backPage}
                    pageIdx={pageNum + 1}
                    styles={notebook.styles}
                    className={"back"}
                  />
                )}
              </section>
            );
          })}
        </article>
      </div>
      <span
        className="arrow-button right-arrow"
        onClick={nextPage}
        aria-label="Next Page"
      >
        &#8594;
      </span>
    </div>
  );
}
