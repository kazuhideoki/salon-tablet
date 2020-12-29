import { reducerLogger } from "../../Reducer/reducerLogger";
import { TTags } from "../Types";
import { TTagsAction } from "./actions";
import * as types from "./types";

export type TagsContextState = TTags;

export const tagsReducer = (
  state: TagsContextState,
  action: TTagsAction
) => {
  let newState: TagsContextState;
  const func = tagsReducer;
  switch (action.type) {
    case types.SET:
      newState = action.payload
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};