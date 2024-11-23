import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Orders: [],
  totalAmount: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setorders: (state, action) => {
      state.Orders = action.payload;
    },
  },
});

export const { setorders } = orderSlice.actions;
export default orderSlice.reducer;
