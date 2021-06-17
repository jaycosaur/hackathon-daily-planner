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
      <Map
        width={width}
        height={height}
        points={[
          {
            latitude: -33.881144323948234,
            longitude: 151.2135851533549,
            id: "1",
          },
        ]}
      />
    </div>
  );
}

export default App;
