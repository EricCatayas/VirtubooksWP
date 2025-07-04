import NotebookCover from "../notebook-cover/notebook-cover.component";

export default function NotebookList({
  headerTitle,
  headerSubtitle,
  notebooks,
  viewAllLink,
}) {
  const hasHeaders = headerTitle || headerSubtitle;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {hasHeaders && (
            <div className="section-header align-center">
              {headerSubtitle && (
                <div className="title">
                  <span>{headerSubtitle}</span>
                </div>
              )}
              <h2 className="section-title">{headerTitle}</h2>
            </div>
          )}

          <div className="product-list">
            <div className="row">
              {notebooks.map((notebook) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={notebook.id}>
                  <div className="product-item">
                    <figure className="product-style">
                      <NotebookCover notebook={notebook} className="book-xxs" />
                    </figure>
                    <figcaption
                      onClick={() => {
                        window.location.href = `/notebooks/${notebook.id}`;
                      }}
                    >
                      <h3>{notebook.title}</h3>
                      <span>by {notebook.author}</span>
                    </figcaption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {viewAllLink && (
        <div className="row">
          <div className="col-md-12">
            <div className="btn-wrap align-right">
              <a href={viewAllLink} className="btn-accent-arrow">
                View all notebooks <i className="icon icon-ns-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
