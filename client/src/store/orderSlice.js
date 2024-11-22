import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { addOrder, setCurrentOrder, clearCurrentOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
