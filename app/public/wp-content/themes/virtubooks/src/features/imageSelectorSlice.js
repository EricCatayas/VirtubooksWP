import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage: null,
  isOpen: false,
};

export const imageSelectorSlice = createSlice({
  name: "imageSelect",
  initialState,
  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetImageSelector: (state) => {
      state.selectedImage = null;
      state.isOpen = false;
    },
    toggleImageSelector: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { selectImage, resetImageSelector, toggleImageSelector } =
  imageSelectorSlice.actions;

export default imageSelectorSlice.reducer;
