import React from "react";
import { Store } from "../../Store/Store";
import { apiInfoBarGet } from "../../../pages/api/info_bar/get";
import { TInfoBar } from "../../Store/Types";

export const useGetInfoBar = () => {
  const { dispatchAppState, appState } = React.useContext(Store);

  return async () => {
    // dispatchAppState({ type: "ON_IS_LOADING_FOOTER" });

    const data = await apiInfoBarGet(appState.userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchAppState({
        type: 'SET_INFO_BAR',
        payload: data,
      });
    }
  };
};
