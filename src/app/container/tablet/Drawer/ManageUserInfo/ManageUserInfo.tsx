import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Settings } from '@material-ui/icons';
import {
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { QrPopover } from './components/QrPopover';
import { HelpButton } from '../../../../components/HelpButton';
import { useGoogleSearchProps } from '../../Modal/Modals/GoogleSearch/GoogleSearch';
import { useHandleSwitch } from './context/useHandleSwitch';
import { useStateAccount } from './context/useStateAccount';
import { useDrawerProps } from '../Drawer/Drawer';
import { useUpdateUser } from '../../../../hooks/userInfo/useUpdateUser';

const useSettingUserInfoProps = () => {
  const {
    userInfo,
    name,
    setName,
    shopName,
    setShopName,
    email,
    setEmail,
    password,
    setPassword,
    isShowMobile,
    setIsShowMobile,
  } = useStateAccount();

  const updateUser = useUpdateUser({
    name,
    shopName,
    email,
    password,
    isShowMobile,
  });
  const { openModal } = useDrawerProps();
  const handleSwitch = useHandleSwitch();
  const { clearHistory } = useGoogleSearchProps();

  return {
    name,
    setName,
    shopName,
    setShopName,
    email,
    password,
    setPassword,
    userInfo,
    updateUser,
    isShowMobile,
    setIsShowMobile,
    handleSwitch,
    clearHistory,
    openModal,
  };
};

export type TUseSettingUserInfoProps = ReturnType<
  typeof useSettingUserInfoProps
>;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

const isValidPassword = (password: string) => {
  const regrex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
  return regrex.test(password);
};

export const SettingUserInfoPresenter: React.FC<TUseSettingUserInfoProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Settings />
        </Avatar>
        <Typography component="h1" variant="h5">
          アカウント
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                value={props.email}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                fullWidth
                id="name"
                label="名前"
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="shopName"
                label="お店の名前"
                name="shopName"
                autoComplete="lname"
                value={props.shopName}
                onChange={(e) => props.setShopName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          {isValidPassword(props.password) ||
          props.password.length === 0 ? null : (
            <Typography component="h3" variant="body1" color={'error'}>
              {/* ※パスワードは半角で英小文字大文字数字をそれぞれ1種類以上含む8文字以上でご入力下さい */}
              <b>
                ※パスワードは【0-9】【a-z】【A-Z】を含む【8文字以上】でご入力下さい
              </b>
            </Typography>
          )}
          {isValidPassword(props.password) ? (
            <Typography component="h3" variant="body1" color={'primary'}>
              {/* ※パスワードは半角で英小文字大文字数字をそれぞれ1種類以上含む8文字以上でご入力下さい */}
              <b>有効なパスワードです。</b>
            </Typography>
          ) : null}
          <Typography component="h3" variant="body1" color={'error'}>
            ※パスワードは変更時のみご入力下さい。
          </Typography>

          <Button
            fullWidth
            color="primary"
            className={classes.submit}
            onClick={() => props.updateUser()}
            disabled={
              isValidPassword(props.password) || props.password.length === 0
                ? false
                : true
            }>
            更新
          </Button>
        </form>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={props.isShowMobile}
                onChange={props.handleSwitch}
                name="isShowMobile"
                color="primary"
              />
            }
            label="パブリックページの出力"
          />
          <HelpButton content="パブリックページを出力すると①URLがあればパスワードなしで誰でもアクセスできるようになります。②観覧用のページのみです。" />
          <QrPopover {...props}>QRコードを表示する</QrPopover>
        </FormGroup>
        <Button
          fullWidth
          onClick={props.clearHistory}
          variant="outlined"
          className={classes.button}>
          Google検索履歴クリア
        </Button>
        <Divider variant="middle" />
        <Button
          fullWidth
          color="secondary"
          className={classes.submit}
          onClick={() => props.openModal('delete_account_form')}
          //  disabled
        >
          アカウントを削除する
        </Button>
      </div>
    </Container>
  );
};

export const SettingUserInfo = () => {
  const props = useSettingUserInfoProps();
  return <SettingUserInfoPresenter {...props} />;
};