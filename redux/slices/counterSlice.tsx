import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  todos: string[];
}

const initialState: CounterState = {
  value: 0,
  todos: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
  },
});

export const { addTodo, removeTodo } = counterSlice.actions;
export default counterSlice.reducer;
