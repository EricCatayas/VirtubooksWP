import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
      state.visibility = newState.visibility;
      state.pages = newState.pages.map((page) => ({
        ...page,
        contents: page.contents.map((content) => ({
          ...content,
        })),
      }));
    },
    insertPage: (state, action) => {
      const { pageId, newPage } = action.payload;
      // Find the index of the page to insert after
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);

      if (pageIndex !== -1) {
        // Insert the new page after the specified page
        state.pages.splice(pageIndex + 1, 0, {
          ...newPage,
          id: uuidv4(), // Generate a new unique ID for the inserted page
          contents: newPage.contents.map((content) => ({
            ...content,
          })),
        });
        // Insert a new page before the back cover to maintain even number of pages
        const newPage2 = {
          id: uuidv4(),
          type: "sheet",
          contents: [],
        };
        const pageLastIndex = state.pages.length - 1;
        state.pages.splice(pageLastIndex - 1, 0, { ...newPage2 });
      }
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
        // Insert after the specified page
        state.pages.splice(pageIndex + 1, 0, { ...newPage1 });
        // Insert a new page before the back cover to maintain even number of pages
        const newPage2 = {
          id: uuidv4(),
          type: "sheet",
          contents: [],
        };
        const pageLastIndex = state.pages.length - 1;
        state.pages.splice(pageLastIndex - 1, 0, { ...newPage2 });
      }
    },
    duplicatePage: (state, action) => {
      const { pageId } = action.payload;
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);
      if (pageIndex !== -1) {
        const pageToDuplicate = state.pages[pageIndex];
        const newPage = {
          ...pageToDuplicate,
          id: uuidv4(), // Generate a new unique ID for the duplicated page
          contents: pageToDuplicate.contents.map((content) => ({
            ...content,
          })),
        };
        // Insert the duplicated page after the original
        state.pages.splice(pageIndex + 1, 0, newPage);
        // Insert a new page before the back cover to maintain even number of pages
        const pageLastIndex = state.pages.length - 1;
        const newPage2 = {
          id: uuidv4(),
          type: "sheet",
          contents: [],
        };
        state.pages.splice(pageLastIndex - 1, 0, newPage2);
      }
    },
    clearPage: (state, action) => {
      const { pageId } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        page.contents = [];
        page.backgroundImage = null; // Clear background image if any
        page.styles = {}; // Clear styles if any
        // Reset any other properties as needed
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
    setStartPage: (state, action) => {
      const { pageId } = action.payload;
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);
      if (pageIndex !== -1) {
        state.pages.forEach((p, idx) => {
          if (idx < pageIndex) delete p.isNumberedPage;
          if (idx >= pageIndex) p.isNumberedPage = true;
        });
      }
    },
    setEndPage: (state, action) => {
      const { pageId } = action.payload;
      const pageIndex = state.pages.findIndex((p) => p.id === pageId);
      if (pageIndex !== -1) {
        state.pages.forEach((p, idx) => {
          if (idx === pageIndex + 1) p.isNumberedPage = false;
          if (idx > pageIndex) delete p.isNumberedPage;
        });
      }
    },
    updatePageNumbering: (state) => {
      let pageNumber = 1;
      let startPageNumbering = false;
      const backCoverIdx = state.pages.length - 1;
      state.pages.forEach((page, idx) => {
        if (page.isNumberedPage) {
          startPageNumbering = true;
        }

        if (startPageNumbering) {
          page.pageNumber = pageNumber++;
        }

        if (!page.isNumberedPage || idx === backCoverIdx) {
          startPageNumbering = false;
          delete page.pageNumber;
        }
      });
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
  insertPage,
  insertBlankPage,
  duplicatePage,
  deletePage,
  setStartPage,
  setEndPage,
  updatePageNumbering,
  addContent,
  updateContent,
  deleteContent,
} = notebookSlice.actions;

export default notebookSlice.reducer;
