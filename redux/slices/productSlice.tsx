import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  product: any;
  status: string;
  error: string | null;
}

// Define the initial state
const initialState: ProductState = {
  product: {},
  status: "idle",
  error: null,
};

// Define an async thunk for fetching product data
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data;
  }
);

// Create a slice for product
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

// Export the reducer
export default productSlice.reducer;
