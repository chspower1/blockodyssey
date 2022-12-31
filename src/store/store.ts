import { configureStore } from "@reduxjs/toolkit";
import resultProductsSlice from "./resultProductsSlice";

const store = configureStore({
  reducer: {
    resultProducts: resultProductsSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
