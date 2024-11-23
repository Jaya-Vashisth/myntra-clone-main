import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: {
    products: [],
  },
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setwishList: (state, action) => {
      state.wishList = action.payload;
    },
    setMark: (state, action) => {
      state.mark = action.payload;
    },
  },
});

export const { setwishList, setMark } = wishlistSlice.actions;
export default wishlistSlice.reducer;
