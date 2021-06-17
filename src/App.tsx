import React, { useContext, useState } from "react";
import "./App.css";
import { AppBar, CircularProgress, IconButton } from "@material-ui/core";
// import TaskView from "./TaskView";
import { useWindowSize } from "./useWindowSize";
import { ThemeProvider } from "@material-ui/core";
import { lightTheme } from "./theme/themes";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import CloseIcon from "@material-ui/icons/Close";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { AppContext } from "./AppHandler/AppContext";
import MapView from "./MapView";
import TaskView from "./TaskView";

const appBarHeight = 50;

enum Pages {
  "TASK_VIEW",
  "MAP_VIEW",
  "TASK_EDIT",
}

const NavButtons = ({
  currentPage,
  onSelect,
}: {
  currentPage: Pages;
  onSelect: (page: Pages) => void;
}) => {
  if (currentPage === Pages.MAP_VIEW) {
    return (
      <IconButton
        color="inherit"
        aria-label="Task list"
        onClick={() => onSelect(Pages.TASK_VIEW)}
      >
        <ListIcon />
      </IconButton>
    );
  }
  if (currentPage === Pages.TASK_VIEW) {
    return (
      <IconButton
        color="inherit"
        aria-label="Task list"
        onClick={() => onSelect(Pages.MAP_VIEW)}
      >
        <MapIcon />
      </IconButton>
    );
  }
  if (currentPage === Pages.TASK_EDIT) {
    return (
      <IconButton
        color="inherit"
        aria-label="Task list"
        onClick={() => onSelect(Pages.TASK_VIEW)}
      >
        <CloseIcon />
      </IconButton>
    );
  }
};

const AddNewTaskFab = ({ onClick }: { onClick: () => void }) => {
  return (
    <Fab color="primary" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};
export const App: React.FC = () => {
  const { width, height } = useWindowSize();
  const { isLoading } = useContext(AppContext);

  const [view, setView] = useState(Pages.MAP_VIEW);

  if (isLoading || !width || !height) {
    return (
      <div className="App loading-spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App" style={{ width, height }}>
        <AppBar
          position="fixed"
          className="main-app-bar"
          style={{ height: appBarHeight }}
        >
          <NavButtons currentPage={view} onSelect={setView} />
          {view !== Pages.TASK_EDIT && (
            <AddNewTaskFab onClick={() => setView(Pages.TASK_EDIT)} />
          )}
        </AppBar>

        <div className="app-content">
          {view === Pages.MAP_VIEW && <MapView width={width} height={height} />}
          {view === Pages.TASK_EDIT && <TaskView />}
          {view === Pages.TASK_VIEW && <h1>Taskss</h1>}
        </div>
      </div>
    </ThemeProvider>
  );
};
