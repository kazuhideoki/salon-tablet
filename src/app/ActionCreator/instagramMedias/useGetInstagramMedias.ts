import React from "react";
import { apiInstagramMediasGet } from "../../../pages/api/instagram_medias/get";
import { T_instagram_id, T_instagram_username } from "../../Store/Types";
import { apiInstagramAccountsReconnectNeeded, T_instagram_accounts_reconnect_needed } from "../../../pages/api/instagram_accounts/reconnect_needed";
import { InstagramContext } from "../../Store/instagram/Context";
import { setMedias, setReconnect } from "../../Store/instagram/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useModalProps } from "../../View/tablet/Modal/Modal/view/Modal";
import { useMainProps } from "../../View/tablet/Main/view/Main";

export const useGetInstagramMedias = () => {
  const {
    dispatchAppState,
  } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const user_id = userInfo.user_id
  const { dispatchInstagram } = React.useContext(InstagramContext);
  const { closeModal } = useModalProps();
  const { handleLoadingMain } = useMainProps();


  // ページ送りでないときは空のオブジェクト
  return async (instagram_id: T_instagram_id, username: T_instagram_username, paging: {after?: string, before?: string }) => {
    
    handleLoadingMain(true)
    closeModal()

    const data = await apiInstagramMediasGet(instagram_id, paging);

    const params:T_instagram_accounts_reconnect_needed  = {instagram_id: instagram_id, user_id: user_id, is_reconnect_needed: true}

    if (data.err === true) {
      alert("取得できませんでした");
      if (data.data.message.type === "OAuthException") {
        console.log("message.typeは OAuthException");
        alert("インスタグラムアカウントの再連携が必要です");
        const result = await apiInstagramAccountsReconnectNeeded(params)
        if(result.err !== true) dispatchInstagram(setReconnect(instagram_id));
      }
      handleLoadingMain(false)
    } else {
      dispatchAppState({
        type: "SET_INSTAGRAM_MEDIAS",
        payload: { selectedInstagramAccount: {id: instagram_id, username}}
      });
      dispatchInstagram(setMedias(data))

    }
  };
};

const d = {
  err: true,
  data: {
    message: {
      message:
        "Error validating access token: Session has expired on Wednesday, 07-Oct-20 16:29:17 PDT. The current time is Friday, 18-Dec-20 16:45:18 PST.",
      type: "OAuthException",
      code: 190,
      fbtrace_id: "ADnfXjfZ1hcR4t2r5wwReYo",
    },
  },
};
