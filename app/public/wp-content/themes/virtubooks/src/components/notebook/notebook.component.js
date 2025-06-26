import NotebookPage from "../page/notebook-page.component";
import React, { useEffect } from "react";
import { useState } from "react";
import "./notebook.styles.css";

export default function NotebookComponent({ notebook, isReadOnly }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = notebook.pages || [];

  const pageState = (page) =>
    currentPage === page
      ? "active"
      : currentPage > page
      ? "flipped"
      : "inactive";

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
    <>
      <div className="book-container">
        <div className="scene">
          <article className="book" data-aspect-ratio={notebook.aspectRatio}>
            {Array.from({ length: Math.ceil(pages.length / 2) }).map(
              (_, idx) => {
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
                        isReadOnly={isReadOnly}
                        onNextPage={nextPage}
                      />
                    )}
                    {backPage && (
                      <NotebookPage
                        page={backPage}
                        pageIdx={pageNum + 1}
                        styles={notebook.styles}
                        className={"back"}
                        isReadOnly={isReadOnly}
                        onPrevPage={prevPage}
                      />
                    )}
                  </section>
                );
              }
            )}
          </article>
        </div>
      </div>
    </>
  );
}
