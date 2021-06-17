import "./App.css";

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

  if (!width || !height) {
    return null;
  }

  return (
    <div className="App" style={{ width, height }}>
<<<<<<< HEAD
      {/* <Map width={width} height={height} polygons={[]} /> */}
      <TaskView></TaskView>
=======
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
>>>>>>> b0e4db482f8709ddbe6da8b505f48dd7e84747a0
    </div>
  );
}

export default App;
