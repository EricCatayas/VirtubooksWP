import { type } from "jquery";
import "./notebook.styles.css";
import React from "react";
import { useState } from "react";

export default function NotebookComponent() {
  const [currentPage, setCurrentPage] = useState(0);

  // Determine the class for the book element
  const pageState = (page) =>
    currentPage === page
      ? "active"
      : currentPage > page
      ? "flipped"
      : "inactive";

  // Book pages must contain an even number of pages (front and back)
  const pages = [
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
  ];

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

  const handleFlip = (page) => {
    if (currentPage === page) {
      nextPage();
    } else if (currentPage > page) {
      prevPage();
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="book-container">
      <div className="scene">
        <article className="book">
          {Array.from({ length: Math.ceil(pages.length / 2) }).map((_, idx) => {
            const frontPage = pages[idx * 2];
            const backPage = pages[idx * 2 + 1];
            return (
              <section
                className={`page ${pageState(idx * 2)}`}
                onClick={() => handleFlip(idx * 2)}
              >
                {frontPage && (
                  <div className="front">
                    {frontPage.header && (
                      <header>
                        <h6>{frontPage.header}</h6>
                      </header>
                    )}
                    {frontPage.contents.map((content, i) => {
                      if (content.type === "title") {
                        return <h1 key={i}>{content.value}</h1>;
                      } else if (content.type === "paragraph") {
                        return <p key={i}>{content.value}</p>;
                      } else {
                        return null;
                      }
                    })}
                  </div>
                )}
                {backPage && (
                  <div className={`back ${pageState(idx * 2 + 1)}`}>
                    {backPage.header && (
                      <header>
                        <h6>{backPage.header}</h6>
                      </header>
                    )}
                    {backPage.contents.map((content, i) => {
                      if (content.type === "title") {
                        return <h1 key={i}>{content.value}</h1>;
                      } else if (content.type === "paragraph") {
                        return <p key={i}>{content.value}</p>;
                      } else {
                        return null;
                      }
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </article>
      </div>
    </div>
  );
}
