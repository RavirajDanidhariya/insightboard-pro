function App() {
  const [count, setCount] = React.useState(0);
  const heading = React.createElement(
    "div",
    { style: { padding: "20px" } },
    React.createElement("h1", {}, "InsightBoard Pro"),
    React.createElement("p", {}, "Step:1 React from CDN - No build tools"),
    [
      React.createElement("h1", {}, "InsightBoard Pro using Array"),
      React.createElement("p", {}, "Step:1 React from CDN - No build tools"),
      React.createElement(
        "button",
        {
          onClick: () => setCount(count + 1),
          style: { padding: "10px 20px", marginRight: "10px" },
        },
        count,
      ),
    ],
  );

  console.log("heading", heading);
  return heading;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
