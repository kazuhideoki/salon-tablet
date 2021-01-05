import React from 'react';
import { ShowArticleType } from '../../../util/interface/Interface';
import {
  apiUserInfoChangeShowArticleType,
  T_user_info_change_show_article_type,
} from '../../../pages/api/user_info/change_show_article_type';
import { UserInfoContext } from '../../store/userInfo/Context';
import { setShowArticleType } from '../../store/userInfo/actions';

export const useChangeShowArticleType = () => {
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;

  return async (showArticleType: ShowArticleType) => {
    const params: T_user_info_change_show_article_type = {
      user_id,
      showArticleType,
    };
    try {
      await apiUserInfoChangeShowArticleType(params);
      dispatchUserInfo(setShowArticleType(showArticleType));
    } catch (err) {
      alert('変更できませんでした');
    }
  };
};
