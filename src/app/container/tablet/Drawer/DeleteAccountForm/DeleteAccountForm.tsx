import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Info } from '@material-ui/icons';
import { useDeleteUser } from '../../../../hooks/userInfo/useDeleteUser';
import { useStateDeleteAccountFrom } from './context/useStateDeleteAccountForm';
import { Copyright } from './components/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function DeleteAccountForm() {
  const classes = useStyles();

  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useStateDeleteAccountFrom();

  const deleteUser = useDeleteUser();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Info />
        </Avatar>
        <Typography component="h1" variant="h5">
          アカウントの削除
        </Typography>
        <Typography component="h2" variant="h6" color="secondary">
          （注意）投稿記事やアカウント情報など、すべてのデータが削除されます。
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="メールアドレス"
            type="email"
            id="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            color="primary"
            className={classes.submit}
            onClick={() => deleteUser(email, password)}>
            アカウントを本当に削除する
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
