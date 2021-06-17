import "./App.css";
import React from "react";

// import TaskView from "./TaskView";
import MapView from "./MapView";
import { useWindowSize } from "./useWindowSize";
import { ThemeProvider } from "@material-ui/core";

import { lightTheme } from "./theme/themes";

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
    <ThemeProvider theme={lightTheme}>
      <div className="App" style={{ width, height }}>
        <MapView width={width} height={height} />
      </div>
    </ThemeProvider>
  );
}

export default App;
