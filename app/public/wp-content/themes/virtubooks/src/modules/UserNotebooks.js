import UserNotebooksSection from "../components/sections/user-notebooks.component";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

class UserNotebooks {
  constructor() {
    this.init();
  }

  init() {
    const container = document.getElementById("user-notebooks");
    if (container) {
      const root = createRoot(container);
      root.render(
        <BrowserRouter>
          <Routes>
            <Route
              path="/notebooks/user/:id"
              element={<UserNotebooksSection />}
            />
          </Routes>
        </BrowserRouter>
      );
    }
  }
}

export default UserNotebooks;
