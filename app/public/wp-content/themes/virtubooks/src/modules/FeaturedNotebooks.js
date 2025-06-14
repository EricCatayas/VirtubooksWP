import FeaturedNotebooksSection from "../components/sections/featured-notebooks.component";
import React from "react";
import { createRoot } from "react-dom/client";

class FeaturedNotebooks {
  constructor() {
    this.init();
  }

  init() {
    const container = document.getElementById("featured-books");
    if (container) {
      const root = createRoot(container);
      root.render(<FeaturedNotebooksSection />);
    }
  }
}

export default FeaturedNotebooks;
