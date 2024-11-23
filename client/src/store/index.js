import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import loadingStatus from "./LoadingStatus";
import wishlistSlice from "./wishlistSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//slices
const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  loadingStatus: loadingStatus,
  cart: cartSlice,
  order: orderSlice,
  wishlists: wishlistSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const myntraStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default myntraStore;
