import NotebookPage from "../page/notebook-page.component";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotebookState } from "../../features/notebookSlice";
import "./notebook.styles.css";

export default function NotebookComponent() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const notebook = useSelector((state) => state.notebook);
  const pages = notebook.pages || [];

  const pageState = (page) =>
    currentPage === page
      ? "active"
      : currentPage > page
      ? "flipped"
      : "inactive";

  // Book pages must contain an even number of pages (front and back)
  const notebookData = {
    id: "notebook-1",
    title: "Virtubooks Notebook",
    aspectRatio: "6:9",
    styles: { padding: "10% 5% 5%", color: "black" },
    pages: [
      {
        id: "0",
        backgroundImageURL:
          "https://unlimitedworks.blob.core.windows.net/conquest/single-image.jpg",
        contents: [
          { value: "Virtubooks", type: "heading" },
          { value: "First Chapter Of Book", type: "paragraph" },
          { value: "This is first chapter of the book", type: "paragraph" },
        ],
      },
      {
        id: "1",
        contents: [
          { value: "This is back side of the front cover", type: "paragraph" },
        ],
      },
      {
        id: "2",
        contents: [
          { value: "– 1 –", type: "heading" },
          {
            value:
              "Sehen Sie, Webstandards sind das Regelwerk, auf dem Webseiten aufbauen. So gibt es Regeln für HTML, CSS, JavaScript oder auch XML; Worte, die Sie vielleicht schon einmal von Ihrem Entwickler gehört haben. Diese Standards sorgen dafür, dass alle Beteiligten aus einer Webseite den größten Nutzen ziehen.",
            type: "paragraph",
          },
          {
            value:
              "Im Gegensatz zu früheren Webseiten müssen wir zum Beispiel nicht mehr zwei verschiedene Webseiten für den Internet Explorer und einen anderen Browser programmieren. Es reicht eine Seite, die - richtig angelegt - sowohl auf verschiedenen Browsern im Netz funktioniert, aber ebenso gut für den Ausdruck oder",
            type: "paragraph",
          },
        ],
      },
      {
        id: "3",
        contents: [
          {
            value: "– 2 –",
            type: "heading",
          },
        ],
      },
      {
        id: "4",
        contents: [
          { value: "– 3 –", type: "heading" },
          {
            value:
              "Sehen Sie, Webstandards sind das Regelwerk, auf dem Webseiten aufbauen. So gibt es Regeln für HTML, CSS, JavaScript oder auch XML; Worte, die Sie vielleicht schon einmal von Ihrem Entwickler gehört haben. Diese Standards sorgen dafür, dass alle Beteiligten aus einer Webseite den größten Nutzen ziehen.",
            type: "paragraph",
          },
          {
            value:
              "Im Gegensatz zu früheren Webseiten müssen wir zum Beispiel nicht mehr zwei verschiedene Webseiten für den Internet Explorer und einen anderen Browser programmieren. Es reicht eine Seite, die - richtig angelegt - sowohl auf verschiedenen Browsern im Netz funktioniert, aber ebenso gut für den Ausdruck oder",
            type: "paragraph",
          },
        ],
      },
      {
        id: "5",
        contents: [
          { value: "– 4 –", type: "heading" },
          {
            value:
              "Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!",
            type: "paragraph",
          },
          {
            value:
              "Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon hören. Gehetzt sah er sich um.",
            type: "paragraph",
          },
        ],
      },
      {
        id: "6",
        contents: [
          { value: "This is back side of the back cover", type: "paragraph" },
        ],
      },
      {
        id: "7",
        contents: [
          { value: "– BACK COVER –", type: "heading" },
          { value: "This is back cover of the book", type: "paragraph" },
        ],
      },
    ],
  };

  useEffect(async () => {
    if (!notebook.id) {
      await setTimeout(() => {
        console.log("Setting initial notebook state");
        // Simulate an async operation, e.g., fetching notebook data
      }, 2000);
      dispatch(setNotebookState(notebookData));
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
