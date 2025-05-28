import { createSlice } from "@reduxjs/toolkit";

// todo
const initialState = {
  id: "",
  title: "",
  pages: [],
  currentPage: 0, // todo
  isReadOnly: false,
  isLoading: false,
};

export const notebookSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {
    setNotebookState: (state, action) => {
      const newState = action.payload;
      state.id = newState.id;
      state.title = newState.title;
      state.pages = newState.pages.map((page) => ({
        ...page,
        contents: page.contents.map((content) => ({
          ...content,
        })),
      }));
    },
    addContent: (state, action) => {
      const { pageId, contentIdx, newContent } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        page.contents.splice(contentIdx + 1, 0, newContent);
      }
    },
    updateContent: (state, action) => {
      const { pageId, contentIdx, newContent } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      const oldContent = page.contents[contentIdx];
      if (page && oldContent) {
        page.contents[contentIdx] = {
          ...oldContent,
          ...newContent,
        };
      }
    },
    deleteContent: (state, action) => {
      const { pageId, contentIdx } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page && page.contents[contentIdx]) {
        page.contents.splice(contentIdx, 1);
      }
    },
  },
});

export const { setNotebookState, addContent, updateContent, deleteContent } =
  notebookSlice.actions;

export default notebookSlice.reducer;
