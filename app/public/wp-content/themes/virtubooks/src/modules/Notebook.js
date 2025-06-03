import NotebookComponent from "../components/notebook/notebook.component";
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
              <Route path="/notebooks/:id" element={<NotebookComponent />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      );
    }
  }
}

export default Notebook;
