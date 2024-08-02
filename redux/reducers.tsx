import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import counterReducer from "./slices/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
