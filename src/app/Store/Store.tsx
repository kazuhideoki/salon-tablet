import React, { useReducer } from "react";
import { appStateReducer } from "../Reducer/appStateReducer";
import { IndexProps, IndexPropsData } from "../../pages";

import { TAppState, initAppState } from "./Types";
import { AppStateAction } from "../Reducer/AppStateAction";

export type ContextProps = {
  appState: TAppState;
  dispatchAppState: React.Dispatch<AppStateAction>;
};
const Store = React.createContext({} as ContextProps);

const StoreContextProvider: React.FC<IndexPropsData> = (props) => {
  const [appState, dispatchAppState] = useReducer(appStateReducer, initAppState(props));

  const values = {
    appState,
    dispatchAppState,
  };

  return <Store.Provider value={values}>{props.children}</Store.Provider>;
};

export { Store, StoreContextProvider };

export default StoreContextProvider;