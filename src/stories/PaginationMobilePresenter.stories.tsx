import React from 'react';
import { PaginationMobilePresenter } from '../app/View/mobile/PaginationMobile';
import { sampleInstagramAccounts } from './sampleInstagramAccounts';
import { sampleTags } from './sampleTags';
export default {
  title: "mobile/PaginationMobile",
  component: PaginationMobilePresenter,
};

const props = {
  isSetting: false,
  getArticles: null,
  paginationParams: {
    page: 3,
    pageCount: 4,
    pageSize: 5,
    rowCount: 18,
  },
  dispatchLoading: null,
  dispatchAppState: null,
  handleOnNumClick: null,
  selectedTagNames: ["英語", "ヘアケア", "商品"],
  selectedInstagramAccount: null,
  isShowInstagram: false,
  tags: sampleTags,
  instagramAccounts: sampleInstagramAccounts,
  selectedArticlesTags: [],
};

export const Normal = () => {

  return (
    <PaginationMobilePresenter {...props}/>
  )
}