import React from 'react'
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from "@material-ui/core";
import { instagramRedirectHost } from '../../../config';
import { Store } from '../../Store/Store';
import { DeleteButton } from '../viewComponents/buttons/DeleteButton';
import { useDeleteInstagramAccount } from '../../ActionCreator/instagramAccounts/useDeleteInstagramAccounts'

export const useManageInstagramAccountsProps = () => {

  const { appState } = React.useContext(Store);
  const {instagramAccounts} = appState
  const deleteInstagramAccount = useDeleteInstagramAccount()

  const instaAuth = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${instagramRedirectHost}/api/instagram_accounts/get_token&scope=user_profile,user_media&response_type=code`;

  return {
    instagramAccounts,
    instaAuth,
    deleteInstagramAccount,
  };
}
type Props = ReturnType<typeof useManageInstagramAccountsProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    header: {
      margin: theme.spacing(2),
    },
    account: {
      display: "flex",
      margin: theme.spacing(1),
    },
  })
);

export const ManageInstagramAccountsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        Instagram アカウント管理
      </Typography>

      <a href={props.instaAuth}>
        <Button>インスタグラムアカウントを追加する</Button>
      </a>
      {props.instagramAccounts.map((value) => {
        return (
          <div className={classes.account}>
            <Button>{value.username}</Button>
            <DeleteButton
              onClick={() => props.deleteInstagramAccount(value.instagram_id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export const ManageInstagramAccounts = () => {
  const props = useManageInstagramAccountsProps()

  return <ManageInstagramAccountsPresenter {...props}/>
}
