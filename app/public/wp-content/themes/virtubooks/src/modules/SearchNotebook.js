import NotebookService from "../services/notebookService.js";

class SearchNotebook {
  constructor() {
    this.notebookService = new NotebookService();
    this.searchInput = null;
    this.searchTimeout = null;
    this.init();
  }
  init() {
    this.searchInput = document.getElementById("search-field");

    if (this.searchInput) {
      // Add event listener for input changes
      this.searchInput.addEventListener("input", (e) => {
        this.handleSearchInput(e);
      });

      // Add event listener for form submission to prevent default behavior
      const searchForm = this.searchInput.closest("form");
      if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this.performSearch(this.searchInput.value.trim());
        });
      }

      // Add click outside handler to close dropdown
      document.addEventListener("click", (e) => {
        const searchBar =document.getElementById("search-bar");
        if (!searchBar) {
          this.clearSearchResults();
        }
      }); // Keep dropdown open when clicking inside search results
      document.addEventListener("click", (e) => {
        if (e.target.closest(".search-results-dropdown")) {
          e.stopPropagation();
        }
      });
    }
  }


  handleSearchInput(e) {
    const keyword = e.target.value.trim();

    // Clear previous timeout to debounce the search
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      if (keyword.length > 0) {
        this.performSearch(keyword);
      } else {
        this.clearSearchResults();
      }
    }, 1500);
  }

  async performSearch(search) {
    if (!search) {
      this.clearSearchResults();
      return;
    }

    try {
      // Show loading state
      this.showLoadingState();

      // Fetch filtered notebooks with the keyword
      const filters = { search, limit: 10 }; // Limit results for search suggestions
      const searchResults =
        await this.notebookService.fetchFilteredNotebooks(filters);

      console.log("Search results:", searchResults);

      // Display search results
      this.displaySearchResults(searchResults, search);
    } catch (error) {
      console.error("Error performing search:", error);
      this.showErrorState(error.message);
    }
  }
  showLoadingState() {
    // Create or update search results container
    let resultsContainer = this.getSearchResultsContainer();
    resultsContainer.innerHTML = `
      <ul class="dropdown-menu show">
        <li>
          <span class="dropdown-item-text">
            <i class="fas fa-spinner fa-spin"></i> Searching...
          </span>
        </li>
      </ul>
    `;
    resultsContainer.style.display = "block";
  }

  displaySearchResults(results, keyword) {
    let resultsContainer = this.getSearchResultsContainer();
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <ul class="dropdown-menu show">
          <li>
            <span class="dropdown-item-text text-muted">
              No notebooks found for "${keyword}"
            </span>
          </li>
        </ul>
      `;
    } else {
      const resultsHTML = results
        .map(
          (notebook) => `        <li>
          <a class="dropdown-item" href="/notebooks/${
            notebook.id
          }" data-notebook-id="${notebook.id}"
             title="${notebook.title}">
            <div class="search-result-title text-truncate">${this.highlightKeyword(
              notebook.title,
              keyword
            )}</div>
            <div class="search-result-author text-muted small text-truncate">by ${
              notebook.author
            }</div>
          </a>
        </li>
      `
        )
        .join("");

      resultsContainer.innerHTML = `
        <ul class="dropdown-menu show">
          <li>
            <h6 class="dropdown-header">Found ${results.length} notebook${
              results.length !== 1 ? "s" : ""
            }</h6>
          </li>
          <li><hr class="dropdown-divider"></li>
          ${resultsHTML}
        </ul>
      `;
    }

    resultsContainer.style.display = "block";
  }
  showErrorState(errorMessage) {
    let resultsContainer = this.getSearchResultsContainer();
    resultsContainer.innerHTML = `
      <ul class="dropdown-menu show">
        <li>
          <span class="dropdown-item-text text-danger">
            <i class="fas fa-exclamation-triangle"></i> Error: ${errorMessage}
          </span>
        </li>
      </ul>
    `;
    resultsContainer.style.display = "block";
  }

  clearSearchResults() {
    let resultsContainer = this.getSearchResultsContainer();
    resultsContainer.style.display = "none";
    resultsContainer.innerHTML = "";
  }
  getSearchResultsContainer() {
    let container = document.querySelector(".search-results-dropdown");

    if (!container) {
      // Create search results container if it doesn't exist
      container = document.createElement("div");
      container.className = "search-results-dropdown";

      // Insert after the search bar
      const searchBar = document.getElementById("search-bar");
      if (searchBar){
        searchBar.appendChild(container);
      }
    }

    return container;
  }

  highlightKeyword(text, keyword) {
    if (!keyword || !text) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }
}

export default SearchNotebook;
