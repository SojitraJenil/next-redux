import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../redux/slices/counterSlice";
import { AppDispatch } from "../redux/store";
import { MdDelete } from "react-icons/md";
import { RootState } from "../redux/reducers";

const Counter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allTask = useSelector((state: RootState) => state.counter.todos);
  const [task, setTask] = useState("");

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
          onClick={() => {
            if (task.trim()) {
              dispatch(addTodo(task));
              setTask("");
            }
          }}
          className="ml-3 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>
      {allTask.length > 0 && (
        <div className="w-full max-w-md mt-8 bg-white rounded-lg shadow-md p-4">
          <ul className="space-y-4">
            {allTask.map((item: string, index: number) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="text-gray-800">
                  {index + 1}. &nbsp;{item}
                </span>
                <button
                  onClick={() => dispatch(removeTodo(index))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <MdDelete className="w-6 h-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Counter;
