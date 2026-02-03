import React from "react";
import ReactDOM from "react-dom/client";
function App() {
  const [count, setCount] = React.useState(1);
  const heading = React.createElement(
    "div",
    { style: { padding: "20px" } },
    React.createElement("h1", { key: "id3" }, "InsightBoard Pro"),
    React.createElement(
      "p",
      { key: "id4" },
      "Step:1 React from CDN - No build tools",
    ),
    [
      React.createElement("h1", { key: "id1" }, "InsightBoard Pro using Array"),
      React.createElement(
        "p",
        { key: "id2" },
        "Step:1 React from CDN - No build tools",
      ),
      React.createElement(
        "button",
        {
          key: "id5",
          onClick: () => setCount(count + 1),
          style: { padding: "10px 20px", marginRight: "10px" },
        },
        count,
      ),
    ],
  );

  console.log("heading2", heading);
  return heading;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
