import React from 'react';

import { useGetFooterItems } from './useGetFooterItems';
import {
  TCreateFooterItem,
  generateFooterItemEdittingParams,
} from './useCreateFooterItem';
import {
  ApiFooterItemsUpdate,
  apiFooterItemsUpdate,
} from '../../../pages/api/footer_items/update';
import { FooterItemsContext } from '../../store/footerItems/Context';
import { AppStateContext } from '../../store/appState/Context';
import { closeModal, isLoadingFooter } from '../../store/appState/actions';

export type TUpdateFooterItem = TCreateFooterItem;

export const useUpdateFooterItem = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { footerItems } = React.useContext(FooterItemsContext);
  const getFooterItems = useGetFooterItems();

  return async (param: TUpdateFooterItem) => {
    dispatchAppState(closeModal());
    dispatchAppState(isLoadingFooter(true));

    const params: ApiFooterItemsUpdate = {
      id: appState.edittingPrams.footerItem.footer_item_id,
      params: {
        ...generateFooterItemEdittingParams(param, footerItems),
        is_published: param.is_published,
      },
    };

    try {
      await apiFooterItemsUpdate(params);
      dispatchAppState(closeModal());
      getFooterItems();
    } catch (err) {
      console.log(`useUpdateFooterItem: ${err}`);

      alert('更新できませんでした');
      dispatchAppState(isLoadingFooter(false));
    }
  };
};
