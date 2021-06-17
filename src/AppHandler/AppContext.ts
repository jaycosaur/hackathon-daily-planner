import React from "react";
import {IAppContextValue} from "../types/IAppContextValue";

export const AppContext = React.createContext<IAppContextValue>({} as any);
