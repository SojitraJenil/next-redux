// redux/reducers.js
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  productDetail: "OK1",
  setProductDetail: "OK",
});

export default rootReducer;
