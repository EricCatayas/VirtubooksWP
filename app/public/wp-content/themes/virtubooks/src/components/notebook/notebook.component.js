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
    pages: [
      {
        id: "0",
        type: "cover",
        header: "Erin E. Sullivan",
        contents: [
          { value: "Virtubooks", type: "title" },
          { value: "First Chapter Of Book", type: "paragraph" },
          { value: "This is first chapter of the book", type: "paragraph" },
        ],
      },
      {
        id: "1",
        type: "cover",
        header: "Book Layout",
        contents: [
          { value: "This is back side of the front cover", type: "paragraph" },
        ],
      },
      {
        id: "2",
        type: "sheet",
        contents: [
          { value: "– 1 –", type: "title" },
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
        type: "sheet",
        contents: [
          { value: "– 2 –", type: "title" },
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
        id: "4",
        type: "sheet",
        contents: [
          { value: "– 3 –", type: "title" },
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
        type: "sheet",
        contents: [
          { value: "– 4 –", type: "title" },
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
        type: "cover",
        contents: [
          { value: "This is back side of the back cover", type: "paragraph" },
        ],
      },
      {
        id: "7",
        type: "cover",
        contents: [
          { value: "– BACK COVER –", type: "title" },
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

  // todo: content type
  // const handleAddContent = (pageId, contentIdx) => {
  //   setPages((prevPages) => {
  //     const updatedPages = [...prevPages];
  //     const newContent = { value: "", type: "paragraph" };
  //     const pageIdx = updatedPages.findIndex((page) => page.id === pageId);
  //     const updatedContents = [...updatedPages[pageIdx].contents];
  //     updatedContents.splice(contentIdx + 1, 0, newContent);
  //     updatedPages[pageIdx] = {
  //       ...updatedPages[pageIdx],
  //       contents: updatedContents,
  //     };
  //     return updatedPages;
  //   });
  // };

  // const handleUpdateContent = (pageId, contentIdx, newContent) => {
  //   setPages((prevPages) => {
  //     const updatedPages = [...prevPages];
  //     const pageIdx = updatedPages.findIndex((page) => page.id === pageId);
  //     const updatedContents = [...updatedPages[pageIdx].contents];
  //     updatedContents[contentIdx] = {
  //       ...updatedContents[contentIdx],
  //       ...newContent,
  //     };
  //     updatedPages[pageIdx] = {
  //       ...updatedPages[pageIdx],
  //       contents: updatedContents,
  //     };
  //     return updatedPages;
  //   });
  // };

  // const handleDeleteContent = (pageId, contentIdx) => {
  //   setPages((prevPages) => {
  //     const updatedPages = [...prevPages];
  //     const pageIdx = updatedPages.findIndex((page) => page.id === pageId);
  //     const updatedContents = [...updatedPages[pageIdx].contents];
  //     updatedContents.splice(contentIdx, 1);
  //     updatedPages[pageIdx] = {
  //       ...updatedPages[pageIdx],
  //       contents: updatedContents,
  //     };
  //     return updatedPages;
  //   });
  // };

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
        <article className="book">
          {Array.from({ length: Math.ceil(pages.length / 2) }).map((_, idx) => {
            const frontPage = pages[idx * 2];
            const backPage = pages[idx * 2 + 1];
            return (
              <section key={idx} className={`page ${pageState(idx * 2)}`}>
                {frontPage && (
                  <NotebookPage page={frontPage} className={"front"} />
                )}
                {backPage && (
                  <NotebookPage page={backPage} className={"back"} />
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
