import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Info } from "@material-ui/icons";
import { signin, signout, useSession, getSession } from "next-auth/client";
import { useUpdateUser } from "../../ActionCreator/user/useUpdateUser";
import { Store } from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const isValidPassword = (password) => {
  const regrex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
  return regrex.test(password)
}

export function SettingUserInfo() {
  const classes = useStyles();
  const {
    name,
    setName,
    shopName,
    setShopName,
    email,
    setEmail,
    password,
    setPassword,
  } = React.useContext(EditorContext);

  const { userInfo } = React.useContext(Store)

  const updateUser = useUpdateUser()

  const handleOnSubmit = () => {
    console.log("handleOnSubmitだよ");
    
    updateUser()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Info />
        </Avatar>
        <Typography component="h1" variant="h5">
          アカウント
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                value={email}
                disabled
                // onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="shopName"
                label="お店の名前"
                name="shopName"
                autoComplete="lname"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Typography component="h3" variant="body1">
            {isValidPassword(password) || password.length === 0 ? null : (
              <Typography component="h3" variant="body1" color={"error"}>
                ※パスワードは半角英小文字大文字数字をそれぞれ1種類以上含む8文字以上でご入力下さい
              </Typography>
            )}
            {userInfo.isSetPassword ?
              <Typography component="h3" variant="body1" color={"error"}>
              ※パスワードは変更時のみご入力下さい。
              </Typography> 
            : <Typography component="h3" variant="body1" color={"secondary"}>
              ※パスワードを設定して下さい。(サインインや各種設定で使用)
              </Typography>
            }
          </Typography>
            
          
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleOnSubmit()}
            disabled={
              isValidPassword(password) || password.length === 0 ? false : true
            }
          >
            更新
          </Button>
        </form>
        {/* <Button
          // type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => handleOnSubmit()}
          disabled={
            isValidPassword(password) || password.length === 0 ? false : true
          }
        >
          アカウントを削除する
          </Button> */}
      </div>
    </Container>
  );
}
