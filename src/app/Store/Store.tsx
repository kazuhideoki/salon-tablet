import React, { useReducer } from "react";
import { appStateReducer } from "../Reducer/appStateReducer";
import { TAppState, initAppState } from "./Types";
import { AppStateAction } from "../Reducer/AppStateAction";
import { IndexPropsData } from "../../pages";
import { ArticlesContextProvider } from "./articles/Context";

export type ContextProps = {
  appState: TAppState;
  dispatchAppState: React.Dispatch<AppStateAction>;
};
const Store = React.createContext({} as ContextProps);

export type TStoreProps = IndexPropsData & {isPublicPage: boolean, device: string, samplePage: string, }

const StoreContextProvider: React.FC<TStoreProps> = (props) => {
  const [appState, dispatchAppState] = useReducer(
    appStateReducer,
    initAppState(props)
  );

  const values = {
    appState,
    dispatchAppState,
  };

  return (
    <Store.Provider value={values}>
      <ArticlesContextProvider articles={props.articles} allArticles={props.allArticles} paginationParams={props.pagination}>
        {props.children}
      </ArticlesContextProvider>
    </Store.Provider>
  );
};

export { Store, StoreContextProvider };

export default StoreContextProvider;