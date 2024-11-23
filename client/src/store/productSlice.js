import { createSlice } from "@reduxjs/toolkit";

const productslice = createSlice({
  name: "product",
  initialState: {
    allproducts: [],
    ProductDetail: null,
    searchproducts: "",
    searchQuery: "",
  },
  reducers: {
    //actions
    setAllproducts: (state, action) => {
      state.allproducts = action.payload;
    },
    setProductDetail: (state, action) => {
      state.ProductDetail = action.payload;
    },

    setSearchproducts: (state, action) => {
      state.searchproducts = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setAllproducts, setProductDetail } = productslice.actions;

export default productslice.reducer;
