import React from 'react';
import {
  apiFooterItemsDelete,
  T_footer_items_delete,
} from '../../../pages/api/footer_items/delete';
import { FooterItemsContext } from '../../Store/footerItems/Context';
import { set } from '../../Store/footerItems/actions';
import { AppStateContext } from '../../Store/appState/Context';
import { isLoadingFooter } from '../../Store/appState/actions';

export const useDeleteFooterItem = () => {
  const { footerItems, dispatchFooterItems } = React.useContext(
    FooterItemsContext
  );
  const { dispatchAppState } = React.useContext(AppStateContext);

  return async ({
    footer_item_id,
    order,
  }: T_footer_items_delete): Promise<void> => {
    const deleting = confirm('本当に削除してよろしいですか？');

    if (deleting === false) {
      return;
    }

    dispatchAppState(isLoadingFooter(true));

    try {
      await apiFooterItemsDelete({ footer_item_id, order });
      dispatchAppState(isLoadingFooter(false));

      const deletedState = footerItems.filter((value) => {
        // 削除するアイテムは含めない
        return value.footer_item_id !== footer_item_id;
      });
      const newState = deletedState.map((value) => {
        // 削除されたアイテムの左側のorderはそのまま出力
        if (value.order < order) {
          return value;
          // 削除されたアイテムの右側はorderの調整のためそれぞれ-1する
        } else if (value.order > order) {
          value.order -= 1;
          return value;
        }
        return value;
      });
      dispatchFooterItems(set(newState));
    } catch (err) {
      console.log(`useDeleteFooterItem: ${err}`);

      alert('削除できませんでした');
      dispatchAppState(isLoadingFooter(false));
    }
  };
};