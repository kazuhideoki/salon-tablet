import React from "react";
import { apiUserInfoUpdate, T_user_info_update } from "../../../../../../pages/api/user_info/update";
import { updatePassword } from "../../../../../../lib/auth/updatePassword";
import { useAuth } from "../../../../../../lib/auth/AuthProvider";
import { UserInfoContext } from "../../../../../Store/userInfo/Context";
import { update } from "../../../../../Store/userInfo/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";
import { closeModal } from "../../../../../Store/appState/actions";

export type TUpdateUser = {
  name: string
  shopName: string
  email: string
  password: string
  isShowMobile: boolean
}

export const useUpdateUser = (param: TUpdateUser) => {
         const { dispatchAppState, appState } = React.useContext(
           AppStateContext
         );
         const { userInfo, dispatchUserInfo } = React.useContext(
           UserInfoContext
         );
         const { user_id } = userInfo;
         const { user } = useAuth();

         return async () => {
           const params: T_user_info_update = {
             user_id: user_id,
             user_name: param.name,
             shop_name: param.shopName,
             user_email: param.email,
             is_generate_public_page: param.isShowMobile,
           };

           try {
             const data = await apiUserInfoUpdate(params);

             // パスワード変更 firebaseで ここ
             if (param.password.length)
               await updatePassword({ password: param.password, user });

             dispatchUserInfo(update(params));
             dispatchAppState(closeModal());

             alert("ユーザーデータを更新しました。");
           } catch (err) {
             console.log("useUpdateUserでエラー " + err);
           }
         };
       };
