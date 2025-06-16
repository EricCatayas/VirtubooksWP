import NotebookCover from "../notebook-cover/notebook-cover.component";
import React from "react";

const NotebookGrid = ({ notebooks }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="product-list">
          <div className="row">
            {notebooks.map((notebook) => (
              <div className="col-md-6 col-lg-4" key={notebook.id}>
                <div className="product-item">
                  <figure className="product-style">
                    <NotebookCover notebook={notebook} className="book-xs" />
                  </figure>
                  <figcaption
                    onClick={() => {
                      window.location.href = `/notebooks/${notebook.id}`;
                    }}
                  >
                    <h3>{notebook.title}</h3>
                    <span>{notebook.author}</span>
                  </figcaption>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotebookGrid;
