import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.itemId === item.itemId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...item,
          total: item.quantity * item.price,
        });
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.total,
        0
      );
    },

    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.itemId !== itemId);

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.total,
        0
      );
    },
    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((i) => i.itemId === itemId);

      if (item) {
        item.quantity = quantity;
        item.total = item.quantity * item.price;
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.total,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
