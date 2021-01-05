import React from 'react';
import { AppStateContext } from '../../../../../../store/appState/Context';

export const useStateFooterItemModal = () => {
  const { appState } = React.useContext(AppStateContext);
  const footerItem = appState.currentModalContent.footerItem;
  return { footerItem };
};
