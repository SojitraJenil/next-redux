// components/Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/slices/counterSlice";

function Counter() {
  const count = useSelector((state: any) => state.counter.value);
  const Demo = useSelector((state: any) => state);
  console.log("Demo", Demo);
  const dispatch = useDispatch();

  return (
    <div className="w-[20%]">
      <h2 className="text-center font-[12px]">Counter: {count}</h2>
      <button
        onClick={() => dispatch(increment())}
        className="bg-slate-500 mx-4 text-white rounded-lg px-3 py-2"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        className="bg-slate-500 mx-4 text-white rounded-lg px-3 py-2"
      >
        Decrement
      </button>
    </div>
  );
}

export default Counter;
