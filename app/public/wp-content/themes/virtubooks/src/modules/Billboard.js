import BillboardComponent from "../components/billboard/billboard.component";
import React from "react";
import { createRoot } from "react-dom/client";

class Billboard {
  constructor() {
    this.init();
  }

  init() {
    // Initialize the billboard component
    const container = document.getElementById("billboard");
    if (container) {
      const root = createRoot(container);
      root.render(<BillboardComponent />);
    }
  }
}

export default Billboard;
