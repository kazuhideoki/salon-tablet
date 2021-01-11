import React from 'react';
import {
  ManageInstagramAccountsPresenter,
  ManageInstagramAccountsPresenterProps,
} from './ManageInstagmaAccounts';
import { sampleInstagramAccounts } from '../../../../../util/dev/sampleInstagramAccounts';
export default {
  title: 'Drawer/ManageInstagramAccountsPresenter',
  component: ManageInstagramAccountsPresenter,
};

const props: ManageInstagramAccountsPresenterProps = {
  instagramAccounts: sampleInstagramAccounts,
  instaAuth: '',
  deleteInstagramAccount: async () => {
    return;
  },
  getInstagramMedias: async () => {
    return;
  },
  loading: false,
  handleLoadingInstagramAccounts: () => {
    return;
  },
};

export const Normal = () => {
  return <ManageInstagramAccountsPresenter {...props} />;
};
export const Loading = () => {
  return <ManageInstagramAccountsPresenter {...props} loading={true} />;
};
export const noInstagramAccounts = () => {
  return <ManageInstagramAccountsPresenter {...props} instagramAccounts={[]} />;
};