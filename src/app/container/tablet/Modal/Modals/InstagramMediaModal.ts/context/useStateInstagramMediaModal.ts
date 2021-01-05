import React from 'react';
import { AppStateContext } from '../../../../../../store/appState/Context';
export const useStateInstagramMediaModal = () => {
  const { appState } = React.useContext(AppStateContext);
  const instagramMedia = appState.currentModalContent.instagramMedia;

  return { instagramMedia };
};
