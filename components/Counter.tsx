import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAsync,
  fetchTodosAsync,
  deleteTodoAsync,
  updateTodoAsync,
} from "../redux/slices/counterSlice";
import { AppDispatch } from "../redux/store";
import EditIcon from "@mui/icons-material/Edit";
import { MdDelete } from "react-icons/md";
import { RootState } from "../redux/reducers";

const Counter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, status, error } = useSelector(
    (state: RootState) => state.counter
  );

  const [task, setTask] = useState<string>("");
  const [currentTodo, setCurrentTodo] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleAddOrUpdateTodo = useCallback(async () => {
    if (task.trim()) {
      try {
        if (currentTodo) {
          // Update existing todo
          await dispatch(
            updateTodoAsync({ ...currentTodo, title: task })
          ).unwrap();
          setCurrentTodo(null);
        } else {
          // Add new todo
          await dispatch(addTodoAsync(task)).unwrap();
        }
        setTask("");
        dispatch(fetchTodosAsync());
      } catch (err) {
        console.error("Failed to save the todo:", err);
      }
    }
  }, [dispatch, task, currentTodo]);

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      try {
        await dispatch(deleteTodoAsync(id)).unwrap();
        dispatch(fetchTodosAsync());
      } catch (err) {
        console.error("Failed to delete the todo:", err);
      }
    },
    [dispatch]
  );

  const handleEditTodo = useCallback((todo: any) => {
    setTask(todo.title);
    setCurrentTodo(todo);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-md flex items-center bg-white rounded-lg shadow-md p-4">
        <input
          type="text"
          placeholder="Add a new task"
          className="flex-grow border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          aria-label="task"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button
          onClick={handleAddOrUpdateTodo}
          className="ml-3 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {currentTodo ? "Update" : "Add"}
        </button>
      </div>
      {status === "loading" && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {status === "failed" && (
        <>
          <p>
            Error: {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
          {console.log(error)}
        </>
      )}
      {todos && todos.length > 0 && (
        <div className="w-full max-w-md mt-8 bg-white rounded-lg shadow-md p-4">
          <ul className="space-y-4">
            {todos
              .slice()
              .reverse()
              .map((todo, index) => (
                <li
                  key={todo._id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm"
                >
                  <span className="text-gray-800">{index + 1}</span>
                  <span className="text-gray-800">{todo.title}</span>
                  <div className="flex">
                    <button
                      onClick={() => handleEditTodo(todo)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <EditIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700 transition-colors pl-3"
                    >
                      <MdDelete className="w-6 h-6" />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Counter;
