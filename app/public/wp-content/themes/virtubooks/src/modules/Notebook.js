import NotebookDirectory from "../components/directory/notebook.directory";
import NotebookSlugDirectory from "../components/directory/notebook-slug.directory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <BrowserRouter>
            <Routes>
              <Route path="/notebooks/:id" element={<NotebookDirectory />} />
              <Route
                path="/notebooks/slug/:slug"
                element={<NotebookSlugDirectory />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      );
    }
  }
}

export default Notebook;
