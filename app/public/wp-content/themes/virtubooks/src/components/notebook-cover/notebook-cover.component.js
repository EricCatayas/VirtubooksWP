import PageContent from "../page-content/page-content.component";
import React from "react";
import "../notebook/notebook.styles.css";
import "../page/notebook-page.styles.css";

export default function NotebookCover({ notebook, className = "" }) {
  const isReadOnly = true;
  const page = notebook.pages[0] || {}; // Default to the first page if available,
  const styles = notebook.styles || {};
  const aspectRatio = notebook.aspectRatio;

  return (
    <article className={`book ${className}`} data-aspect-ratio={aspectRatio}>
      <section className={`page active`}>
        <div
          className="front" // e.g. front, or back
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
              />
            ))}
          </section>
          <section className="page-footer">
            {/* {page.footer && ( <PageFooter /> )} */}
          </section>
        </div>
      </section>
    </article>
  );
}
