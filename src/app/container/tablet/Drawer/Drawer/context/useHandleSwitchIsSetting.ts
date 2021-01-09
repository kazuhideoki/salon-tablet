import React from 'react';
import { useGetArticles } from '../../../../../hooks/articles/useGetArticles';
import { AppStateContext } from '../../../../../store/appState/Context';

export const useHandleSwitchIsSetting = () => {
  const { appState } = React.useContext(AppStateContext);
  const getArticles = useGetArticles();

  return () => {
    getArticles(true, 1, appState.selectedArticlesTags, false);
  };
};
