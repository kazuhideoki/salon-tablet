import React from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from '@material-ui/core';
import { DeleteButton } from '../../../../../components/editButtonBox/DeleteButton';
import { Skeleton } from '@material-ui/lab';
import { useDeleteInstagramAccount } from '../context/useDeleteInstagramAccount';
import { useStateManageInstagramAccount } from '../context/useStateManageInstagramAccount';
import { useHandleLoadingInstagramAccounts } from '../context/useHandleLoadingInastagramAccounts';
import { useGetInstagramMedias } from '../context/useGetInstagramMedias';

export const useManageInstagramAccountsProps = () => {
  const {
    instagramAccounts,
    loading,
    instaAuth,
  } = useStateManageInstagramAccount();
  const handleLoadingInstagramAccounts = useHandleLoadingInstagramAccounts();

  const deleteInstagramAccount = useDeleteInstagramAccount();
  const getInstagramMedias = useGetInstagramMedias();

  return {
    instagramAccounts,
    getInstagramMedias,
    instaAuth,
    deleteInstagramAccount,
    loading: loading.manageInstagramAccounts,
    handleLoadingInstagramAccounts,
  };
};
export type TManageInstagramAccountsPresenter = ReturnType<
  typeof useManageInstagramAccountsProps
>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    header: {
      margin: theme.spacing(2),
    },
    txt: {
      margin: theme.spacing(2),
      color: 'grey',
    },
    account: {
      display: 'flex',
      margin: theme.spacing(1),
    },
    reconnect_needed: {
      color: theme.palette.error.main,
    },
    connectButton: {
      textDecoration: 'none',
    },
    skeleton: {
      width: 160,
      height: 38,
      borderRadius: 4,
    },
  })
);

export const ManageInstagramAccountsPresenter: React.FC<TManageInstagramAccountsPresenter> = (
  props
) => {
  const classes = useStyles();

  const displayInstagramAccounts = props.instagramAccounts.map(
    (value, index) => {
      if (props.loading) {
        return (
          <Skeleton
            variant="rect"
            className={`${classes.account} ${classes.skeleton}`}
          />
        );
      }

      return (
        <div className={classes.account} key={index}>
          <Button
            disabled={value.is_reconnect_needed}
            onClick={() =>
              props.getInstagramMedias(value.instagram_id, value.username, {})
            }>
            {value.username}
          </Button>
          {value.is_reconnect_needed ? (
            <a href={props.instaAuth} className={classes.connectButton}>
              <Button className={classes.reconnect_needed} variant="text">
                要再連携
              </Button>
            </a>
          ) : null}
          <DeleteButton
            onClick={() => props.deleteInstagramAccount(value.instagram_id)}
          />
        </div>
      );
    }
  );

  const noInstagramAccounts = (
    <Typography variant="subtitle1">Instagramと連携されていません</Typography>
  );

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        Instagram アカウント管理
      </Typography>

      <a href={props.instaAuth} className={classes.connectButton}>
        <Button>インスタグラムアカウントと連携する</Button>
      </a>
      <Typography variant="subtitle1" component="p" className={classes.txt}>
        現在Instagramの連携は招待制になっています。ご希望の方はご連絡下さい。
      </Typography>
      {props.instagramAccounts.length
        ? displayInstagramAccounts
        : noInstagramAccounts}
    </div>
  );
};

export const ManageInstagramAccounts = () => {
  const props = useManageInstagramAccountsProps();

  return <ManageInstagramAccountsPresenter {...props} />;
};