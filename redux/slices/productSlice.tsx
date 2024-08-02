import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  product: any;
  status: string;
  error: string | null;
  cartedProduct: any;
}

// Define the initial state
const initialState: ProductState = {
  product: {},
  status: "idle",
  error: null,
  cartedProduct: [],
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
  reducers: {
    addProduct: (cartedProduct, payload) => {
      const updatedProducts = new Set([
        ...cartedProduct.cartedProduct,
        payload.payload,
      ]);
      cartedProduct.cartedProduct = Array.from(updatedProducts);
    },
  },
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

export const { addProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
