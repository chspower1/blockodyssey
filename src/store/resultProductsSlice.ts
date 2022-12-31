import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ResultProducts } from "@type/product";
interface ResultProductsState {
  value: ResultProducts;
}
const initialState: ResultProductsState = {
  value: {
    total: 0,
    products: null,
  },
};
const resultProductsSlice = createSlice({
  name: "resultProducts",
  initialState,
  reducers: {
    setResultProducts: (state, action: PayloadAction<ResultProducts>) => {
      state.value = action.payload;
    },
  },
});

export const { setResultProducts } = resultProductsSlice.actions;
export default resultProductsSlice.reducer;
