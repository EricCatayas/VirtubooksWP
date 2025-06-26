export function PageNavigationButton({
  direction = "next",
  onNextPage = () => {},
  onPrevPage = () => {},
}) {
  const isNext = direction === "next";
  return isNext ? (
    <span className="next-page-button" title="Next Page" onClick={onNextPage}>
      <i className="fas fa-arrow-right"></i>
    </span>
  ) : (
    <span
      className="prev-page-button"
      title="Previous Page"
      onClick={onPrevPage}
    >
      <i className="fas fa-arrow-left"></i>
    </span>
  );
}
