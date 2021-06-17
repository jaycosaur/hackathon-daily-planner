import "./App.css";
import React from "react";
import { v4 as uuid } from "uuid";

import Map from "./map";
import TaskView from "./TaskView";
import { useWindowSize } from "./useWindowSize";

function App() {
  const { width, height } = useWindowSize();

  // const { isLoading, users, activeUser, login } = useContext(AppContext);
  // console.log(isLoading, users, activeUser);
  // useEffect(() => {
  //   setTimeout(() => {
  //     login("jye.lewis@propelleraero.com.au")
  //       .then(() => console.log("Logged in"))
  //       .catch(console.error);
  //   }, 1000);
  // }, []);

  const [points, setPoints] = React.useState<
    Array<{
      latitude: number;
      longitude: number;
      id: string;
    }>
  >([
    {
      latitude: -33.881144323948234,
      longitude: 151.2135851533549,
      id: "1",
    },
  ]);

  if (!width || !height) {
    return null;
  }

  return (
    <div className="App" style={{ width, height }}>
      <Map
        width={width}
        height={height}
        points={points}
        onClickPoint={(pt) =>
          setPoints((old) => [...old, { id: uuid(), ...pt }])
        }
        onPointSelected={(pt) =>
          setPoints((old) => old.filter((old) => old.id !== pt.id))
        }
      />
    </div>
  );
}

export default App;
