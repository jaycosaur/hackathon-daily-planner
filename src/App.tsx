import "./App.css";

import Map from "./map";
import { useWindowSize } from "./useWindowSize";

function App() {
  const { width, height } = useWindowSize();

  if (!width || !height) {
    return null;
  }

  return (
    <div className="App" style={{ width, height }}>
      <Map width={width} height={height} polygons={[]} />
    </div>
  );
}

export default App;
