import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App} from "./App";
import { QueryClient, QueryClientProvider } from 'react-query'
import {AppHandler} from "./AppHandler";

// required for react-query
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppHandler>
        <App />
      </AppHandler>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
