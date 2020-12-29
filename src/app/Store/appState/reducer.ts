import { reducerLogger } from "../../Reducer/reducerLogger";
import { TAppState } from "../Types";
import { TAppStateAction } from "./actions";
import * as types from "./types";

export type AppStateContextState = TAppState;

export const appStateReducer = (
  state: AppStateContextState,
  action: TAppStateAction
) => {
  let newState: AppStateContextState;
  const func = appStateReducer;
  switch (action.type) {
    case types.OPEN_MODAL:
      newState = {
        ...state,
        setModal: action.payload,
        isModalOpen: true,
      };
      break;
    case types.CLOSE_MODAL:
      newState = {
        ...state,
        isModalOpen: false,
        edittingPrams: {
          ...state.edittingPrams,
          isModalSizeChanged: false,
        },
      };
      break;
    case types.OPEN_DRAWER:
      newState = {
        ...state,
        isDrawerOpen: true,
        isModalOpen: false,
      };
      break;
    case types.CLOSE_DRAWER:
      newState = {
        ...state,
        isDrawerOpen: false,
      };
      break;
    case types.IS_LOADING_MAIN:
      newState = {
          ...state,
          loading: {
            ...state.loading,
            main: action.payload,
          }
        }
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};