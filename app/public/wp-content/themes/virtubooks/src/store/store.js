import { configureStore } from "@reduxjs/toolkit";
import notebookReducer from "../features/notebookSlice";

export default configureStore({
  reducer: {
    notebook: notebookReducer,
  },
});
