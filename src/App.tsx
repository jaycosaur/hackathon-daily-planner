import React, {useCallback, useContext, useState} from "react";
import "./App.css";
import {v4 as uuid} from "uuid";
import {AppBar, CircularProgress, IconButton} from "@material-ui/core";
import Map from "./map";
import {useWindowSize} from "./useWindowSize";
import {ThemeProvider} from "@material-ui/core";
import {lightTheme} from "./theme/themes";
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import {AppContext} from "./AppHandler/AppContext";

const appBarHeight = 50;

// TODO: show spinner while loading
export const App: React.FC = () => {
  const { width, height } = useWindowSize();

  const [showingTaskList, setShowingTaskList] = useState(false);
  const toggleTaskList = useCallback(() => {
    setShowingTaskList(x => !x);
  }, [setShowingTaskList]);

  if (!width || !height) {
    return null;
  }

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

  return <ThemeProvider theme={lightTheme}>
    <div className="App" style={{width, height}}>
    <AppBar position="fixed" className="main-app-bar" style={{ height: appBarHeight }}>
      <IconButton
        color="inherit"
        aria-label="Task list"
        onClick={toggleTaskList}
      >
        {
          showingTaskList ? <ListIcon/> : <MapIcon/>
        }
      </IconButton>
    </AppBar>
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
  </ThemeProvider>
}
