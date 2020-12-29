import React from 'react'
import { ArticlesContext } from "../../../../Store/articles/Context";
import { InstagramContext } from '../../../../Store/instagram/Context';
import { Store } from '../../../../Store/Store';
import { TagsContext } from '../../../../Store/tags/Context';
import { UserInfoContext } from '../../../../Store/userInfo/Context';
import { useOpenInstagramModal } from './useOpenInstagramModal';
export const useStateMain = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { articles } = React.useContext(ArticlesContext);
  const { tags } = React.useContext(TagsContext);
  const { instagramMedias } = React.useContext(InstagramContext)
  const { userInfo } = React.useContext(UserInfoContext);
  const {
    loading,
    isShowInstagram,
    isSetting,
  } = appState;

  return {
    dispatchAppState,
    articles,
    tags,
    instagramMedias,
    loading: loading.main,
    isShowInstagram,
    userInfo,
    isSetting,
  };
}