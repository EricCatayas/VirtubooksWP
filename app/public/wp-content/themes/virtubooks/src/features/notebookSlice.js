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
    insertBlankPage: (state, action) => {
      const { pageId } = action.payload;
      // Find the index of the page to insert after
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);
      if (pageIndex !== -1) {
        const frontPage = {
          id: Date.now().toString(),
          type: "sheet",
          side: "front",
          contents: [],
        };
        const backPage = {
          id: Date.now().toString() + "-back",
          type: "sheet",
          side: "back",
          contents: [],
        };
        const isLastPage = pageIndex === state.pages.length - 1;
        if (isLastPage) {
          // Insert before the last page
          state.pages.splice(pageIndex - 1, 0, frontPage, backPage);
        } else {
          // Insert after the specified page
          state.pages.splice(pageIndex + 1, 0, frontPage, backPage);
        }
      }
    },
    deletePage: (state, action) => {
      const { pageId } = action.payload;
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);
      const pageToDelete = state.pages[pageIndex];
      if (
        pageIndex !== -1 &&
        pageToDelete.type !== "cover" &&
        state.pages.lenght > 4
      ) {
        // Remove the page and its counterpart side
        if (state.pages[pageIndex].side === "front") {
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
