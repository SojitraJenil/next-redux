import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Todo {
  _id: string;
  title: string;
  content: string;
}

interface CounterState {
  value: number;
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CounterState = {
  value: 0,
  todos: [],
  status: "idle",
  error: null,
};

// Thunk for adding a todo
export const addTodoAsync = createAsyncThunk(
  "counter/addTodoAsync",
  async (todo: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/posts", {
        title: todo,
        content: "todo",
      });
      return response.data; // Adjust this if needed based on your API response structure
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to add todo");
    }
  }
);

// Thunk for fetching todos
export const fetchTodosAsync = createAsyncThunk(
  "counter/fetchTodosAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/gets");
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch todos");
    }
  }
);

// Thunk for deleting a todo
export const deleteTodoAsync = createAsyncThunk(
  "counter/deleteTodoAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete/${id}`);
      return id; // Return the id of the deleted todo
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to delete todo");
    }
  }
);

// Thunk for updating a todo
export const updateTodoAsync = createAsyncThunk(
  "counter/updateTodoAsync",
  async (updatedTodo: Todo, { rejectWithValue }) => {
    try {
      console.log("updatedTodo", updatedTodo);
      const response = await axios.put(
        `http://localhost:3000/api/update/${updatedTodo._id}`,
        updatedTodo
      );
      return response.data; // Adjust this if needed based on your API response structure
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to update todo");
    }
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload || [];
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(updateTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default counterSlice.reducer;
