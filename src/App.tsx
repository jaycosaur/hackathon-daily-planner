import React, { useContext, useState } from "react";
import "./App.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
} from "@material-ui/core";
import { useWindowSize } from "./useWindowSize";
import { ThemeProvider } from "@material-ui/core";
import { lightTheme } from "./theme/themes";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";

import { AppContext } from "./AppHandler/AppContext";
import MapView from "./MapView";
import TaskView from "./TaskView";
import ListView from "./ListView";
import { LoginPage } from "./LoginPage";

const appBarHeight = 50;

enum Pages {
  "TASK_VIEW",
  "MAP_VIEW",
  "TASK_EDIT",
}

export const App: React.FC = () => {
  const { width, height } = useWindowSize();
  const { isLoading, activeUser } = useContext(AppContext);

  const [view, setView] = useState(Pages.MAP_VIEW);

  if (isLoading || !width || !height) {
    return (
      <div className="App loading-spinner">
        <CircularProgress />
      </div>
    );
  }

  if (activeUser === null) {
    return (
      <ThemeProvider theme={lightTheme}>
        <LoginPage />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App" style={{ width, height: height - appBarHeight }}>
        <div className="app-content">
          {view === Pages.MAP_VIEW && (
            <MapView width={width} height={height - appBarHeight} />
          )}
          {view === Pages.TASK_EDIT && <TaskView onCompleted={() => {}} />}
          {view === Pages.TASK_VIEW && <ListView />}
        </div>
      </div>
      <BottomNavigation
        value={"Map"}
        onChange={(event, newValue) => {
          setView(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Map"
          icon={<MapIcon />}
          value={Pages.MAP_VIEW}
        />
        <BottomNavigationAction
          label="List"
          icon={<ListIcon />}
          value={Pages.TASK_VIEW}
        />
        <BottomNavigationAction icon={<AddIcon />} value={Pages.TASK_EDIT} />
      </BottomNavigation>
    </ThemeProvider>
  );
};
