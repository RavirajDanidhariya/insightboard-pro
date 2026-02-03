import { useState } from "react";

const App = () => {
     const [count, setCount] = useState(1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>InsightBoard Pro</h1>
      <p>Step:1 React from Library - with Vite as a build tool</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: "10px 20px", marginRight: "10px" }}
      >
        {count}
      </button>
    </div>
  );
}

export default App