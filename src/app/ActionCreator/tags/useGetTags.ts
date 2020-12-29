import React from "react";
import { Store } from "../../Store/Store";
import { apiTagsGet } from "../../../pages/api/tags/get";
import { TagsContext } from "../../Store/tags/Context";
import { set } from "../../Store/tags/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";

export const useGetTags = () => {
  const { dispatchAppState } = React.useContext(Store);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchTags } = React.useContext(TagsContext)

  return async () => {

    dispatchAppState({type: "ON_IS_LOADING_TAGS"})

    const data = await apiTagsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_TAGS" });
    } else {
      dispatchAppState({
        type: "SET_TAGS",
      });
      dispatchTags(set(data))
    }
  };
};
