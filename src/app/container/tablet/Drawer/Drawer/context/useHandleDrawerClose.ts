import React from 'react';
import { useGetArticles } from '../../../../../hooks/articles/useGetArticles';
import { closeDrawer } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';

export const useHandleDrawerClose = () => {
  const getArticles = useGetArticles();
  const { appState, dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    getArticles(false, 1, appState.selectedArticlesTags, false);
    dispatchAppState(closeDrawer());
  };
};
