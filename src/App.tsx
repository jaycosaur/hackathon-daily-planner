import React, { useCallback, useContext, useState } from "react";
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
import CloseIcon from "@material-ui/icons/Close";

import { AppContext } from "./AppHandler/AppContext";
import MapView from "./MapView";
import ListView from "./ListView";
import { LoginPage } from "./LoginPage";
import FilterControls from "./FilterControls";
import { FilterProvider } from "./FilterControls/FilterContext";
import { TaskView } from "./TaskView";
import { guid } from "./types/guid";
import { Position } from "./map/types";

const appBarHeight = 50;

enum Pages {
  "TASK_VIEW",
  "MAP_VIEW",
  "TASK_EDIT",
}

const hasSearch = (page: Pages) => {
  if ([Pages.MAP_VIEW, Pages.TASK_VIEW].includes(page)) {
    return true;
  }
  return false;
};

const PageContainer: React.FC<{ page: Pages }> = (props) => {
  return (
    <div>
      {hasSearch(props.page) && (
        <div style={{ position: "fixed", zIndex: 100, width: "100%" }}>
          <FilterControls />
        </div>
      )}

      {props.children}
    </div>
  );
};

export const App: React.FC = () => {
  const { width, height } = useWindowSize();
  const { isLoading, activeUser } = useContext(AppContext);

  const [view, setView] = useState(Pages.MAP_VIEW);

  const [activeTaskId, setActiveTaskId] = useState<null | guid>();
  const handleSelectTask = useCallback(
    (x) => {
      setActiveTaskId(x);
      setView(Pages.TASK_EDIT);
    },
    [setActiveTaskId]
  );

  const handleCreateTaskFromPosition = useCallback((pt: Position) => {
    alert("Create task from position??");
  }, []);

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
    <FilterProvider>
      <ThemeProvider theme={lightTheme}>
        <div className="App" style={{ width, height: height - appBarHeight }}>
          <div className="app-content">
            <PageContainer page={view}>
              {view === Pages.MAP_VIEW && (
                <MapView
                  width={width}
                  height={height - appBarHeight}
                  onTaskSelect={handleSelectTask}
                  onEmptyPositionSelect={handleCreateTaskFromPosition}
                />
              )}
              {view === Pages.TASK_EDIT && <TaskView taskId={activeTaskId} />}
              {view === Pages.TASK_VIEW && (
                <ListView onTaskSelect={handleSelectTask} />
              )}
            </PageContainer>
          </div>
        </div>
        <div style={{ background: "white" }}>
          <BottomNavigation
            value={"Map"}
            onChange={(event, newValue) => {
              setActiveTaskId(null); // sorry
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
            {view === Pages.TASK_EDIT ? (
              <BottomNavigationAction
                icon={<CloseIcon />}
                value={Pages.MAP_VIEW}
              />
            ) : (
              <BottomNavigationAction
                icon={<AddIcon />}
                value={Pages.TASK_EDIT}
              />
            )}
          </BottomNavigation>
        </div>
      </ThemeProvider>
    </FilterProvider>
  );
};
