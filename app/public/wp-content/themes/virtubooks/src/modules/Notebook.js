import $ from "jquery";
import React from "react";
import { createRoot } from "react-dom/client";
import NotebookComponent from "../components/notebook/notebook.component";

class Notebook {
  constructor() {
    this.init();
  }
  init() {
    // Initialize the notebook component
    const container = document.getElementById("notebook-app-root");
    if (container) {
      const root = createRoot(container);
      root.render(<NotebookComponent />);
    }
  }
}

export default Notebook;
