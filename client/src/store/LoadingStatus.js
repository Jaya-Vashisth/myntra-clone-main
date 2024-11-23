import { createSlice } from "@reduxjs/toolkit";

const loadingStatusSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingStatusSlice.actions;
export default loadingStatusSlice.reducer;
