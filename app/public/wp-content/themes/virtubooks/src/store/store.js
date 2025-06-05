import { configureStore } from "@reduxjs/toolkit";
import notebookReducer from "../features/notebookSlice";
import imageSelectorReducer from "../features/imageSelectorSlice";

export default configureStore({
  reducer: {
    notebook: notebookReducer,
    imageSelector: imageSelectorReducer,
  },
});
