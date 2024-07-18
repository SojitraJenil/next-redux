// redux/slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const Product = createSlice({
  name: "counter",
  initialState,
  reducers: {
    productDetail() {
      [];
    },
    setProductDetail() {
      [];
    },
  },
});

export const { productDetail, setProductDetail } = Product.actions;

export default Product.reducer;
