import PopularNotebooksSection from "../components/sections/popular-notebooks.component";
import React from "react";
import { createRoot } from "react-dom/client";

class PopularNotebooks {
  constructor() {
    this.init();
  }

  init() {
    const container = document.getElementById("popular-books");
    if (container) {
      const root = createRoot(container);
      root.render(<PopularNotebooksSection />);
    }
  }
}

export default PopularNotebooks;
