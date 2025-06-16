import AllNotebooksSection from "../components/sections/all-notebooks.component";
import React from "react";
import { createRoot } from "react-dom/client";

class AllNotebooks {
  constructor() {
    this.init();
  }

  init() {
    const container = document.getElementById("all-notebooks");
    if (container) {
      const root = createRoot(container);
      root.render(<AllNotebooksSection />);
    }
  }
}

export default AllNotebooks;
