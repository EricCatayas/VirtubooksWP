import NotebookCover from "../notebook-cover/notebook-cover.component";

export default function NotebookList({
  headerTitle,
  headerSubtitle,
  notebooks,
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-header align-center">
            {headerSubtitle && (
              <div className="title">
                <span>{headerSubtitle}</span>
              </div>
            )}
            <h2 className="section-title">{headerTitle}</h2>
          </div>

          <div className="product-list">
            <div className="row">
              {notebooks.map((notebook) => (
                <div className="col-md-3" key={notebook.id}>
                  <div className="product-item">
                    <figure className="product-style">
                      <NotebookCover notebook={notebook} className="book-xxs" />
                    </figure>
                    <figcaption>
                      <h3>{notebook.title}</h3>
                      <span>{notebook.author}</span>
                      <div className="item-price">Read More</div>
                    </figcaption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="btn-wrap align-right">
            <a href="#" className="btn-accent-arrow">
              View all notebooks <i className="icon icon-ns-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
