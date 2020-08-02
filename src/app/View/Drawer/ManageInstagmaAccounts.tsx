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

export const useManageInstagramAccountsProps = () => {

  const { instagramAccounts } = React.useContext(Store);

  const instaAuth = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${instagramRedirectHost}/api/instagram_accounts/get_token&scope=user_profile,user_media&response_type=code`;

  return {
    instagramAccounts,
    instaAuth
  }
}
type Props = ReturnType<typeof useManageInstagramAccountsProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
    acount: {
      display: "flex",
    }
  })
);

export const ManageInstagramAccountsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        Instagram アカウント管理
      </Typography>

      <a href={props.instaAuth}>
        <Button>インスタグラムアカウントを登録する</Button>
      </a>
      {props.instagramAccounts.map((value) => {
        return (
          <div className={classes.acount}>
            <Button>{value.username}</Button>
            <DeleteButton />
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
