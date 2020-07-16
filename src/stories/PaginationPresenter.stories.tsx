import React from 'react';
import { PPaginationPresenter } from '../app/View/Footer/Pagination/PPagination';
export default {
  title: "Footer/Pagination/PPagination",
  component: PPaginationPresenter,
};

const props = {
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
  
}

export const Normal = () => {

  return (
    <PPaginationPresenter {...props}/>
  )
}