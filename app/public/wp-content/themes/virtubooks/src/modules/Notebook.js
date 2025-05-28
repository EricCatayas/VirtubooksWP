import NotebookComponent from "../components/notebook/notebook.component";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../store/store";

class Notebook {
  constructor() {
    this.init();
  }
  init() {
    // Initialize the notebook component
    const container = document.getElementById("notebook-app-root");
    if (container) {
      const root = createRoot(container);
      root.render(
        <Provider store={store}>
          <NotebookComponent />
        </Provider>
      );
    }
  }
}

export default Notebook;
