import { useRef, useState } from "react";

function RefDemo() {
  const [count, setCount] = useState(0);
  const ref = useRef(0);

  console.log("🔄 Component Rendered");
  console.log("Current ref value:", ref.current);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">useRef Demo</h1>

      <div className="space-y-2">
        <p>State Count: {count}</p>
        <p>Ref Count: {ref.current}</p>
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => {
          ref.current++;
          console.log("Ref changed to:", ref.current);
        }}
      >
        Change Ref
      </button>

      <button
        className="px-4 py-2 bg-green-600 text-white rounded ml-4"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Change State
      </button>
    </div>
  );
}

export default RefDemo;
