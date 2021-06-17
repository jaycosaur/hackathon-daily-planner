import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Map from "./map";
import { useWindowSize } from "./useWindowSize";

function App() {
  const { width, height } = useWindowSize();

  if (!width || !height) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="App" style={{ width, height }}>
          <Map width={width} height={height} polygons={[]} />
        </div>
      </header>
    </div>
  );
}

export default App;
