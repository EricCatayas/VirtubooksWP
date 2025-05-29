import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
    insertBlankPage: (state, action) => {
      const { pageId } = action.payload;
      // Find the index of the page to insert after
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);

      if (pageIndex !== -1) {
        const newPage1 = {
          id: uuidv4(),
          type: "sheet",
          contents: [],
        };
        const newPage2 = {
          id: uuidv4(),
          type: "sheet",
          contents: [],
        };

        // Insert after the specified page
        state.pages.splice(pageIndex + 1, 0, { ...newPage1 });
        // Insert a new page before the back cover to maintain even number of pages
        const pageLastIndex = state.pages.length - 1;
        state.pages.splice(pageLastIndex - 1, 0, { ...newPage2 });
      }
    },
    deletePage: (state, action) => {
      const { pageId } = action.payload;
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);
      const numberOfPages = state.pages.length;
      if (pageIndex !== -1 && numberOfPages > 2) {
        // Remove the page and its counterpart side
        const isFrontPage = pageIndex % 2 === 0;
        if (isFrontPage) {
          state.pages.splice(pageIndex, 2);
        } else {
          state.pages.splice(pageIndex - 1, 2);
        }
      }
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

export const {
  setNotebookState,
  insertBlankPage,
  deletePage,
  addContent,
  updateContent,
  deleteContent,
} = notebookSlice.actions;

export default notebookSlice.reducer;
