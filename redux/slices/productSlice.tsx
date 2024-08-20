import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  [key: string]: any;
}

interface ProductState {
  product: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  cartedProduct: Product[];
}

// Define the initial state
const initialState: ProductState = {
  product: [],
  status: "idle",
  error: null,
  cartedProduct: [],
};

// Define an async thunk for fetching product data
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.products;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id: any) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
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
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.product = action.payload;
        }
      )
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.cartedProduct.push(action.payload);
        }
      );
  },
});

export const { addProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
