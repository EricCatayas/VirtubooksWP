import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage: {
    type: "", // e.g. "content", "background"
    imageURL: "",
  },
  isOpen: false,
};

export const imageSelectorSlice = createSlice({
  name: "imageSelect",
  initialState,
  reducers: {
    selectImage: (state, action) => {
      const { imageURL } = action.payload;
      state.selectedImage = {
        ...state.selectedImage,
        imageURL: imageURL,
      };
    },
    resetImageSelector: (state) => {
      state.selectedImage = null;
      state.isOpen = false;
    },
    toggleImageSelector: (state, action) => {
      const { type } = action.payload || {};
      state.isOpen = !state.isOpen;
      state.selectedImage = {
        ...state.selectedImage,
        type: type ?? state.selectedImage.type,
      };
    },
  },
});

export const { selectImage, resetImageSelector, toggleImageSelector } =
  imageSelectorSlice.actions;

export default imageSelectorSlice.reducer;
