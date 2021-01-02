import React from 'react';
import { AuthForm } from '../../pageComponent/AuthFrom';
import { BackgroundDiv, useStylesAuthForm } from './signin';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../../lib/auth/initFirebase';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import { AuthCircular } from '../../lib/AuthCircular';

initFirebase();

const handleSingup = async (email: string, password: string) => {
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);

    return firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (err) {
    console.log('handleSingupは ' + err);
    alert('エラーによりアカウントを作成出来ませんでした');
    return null;
  }
};

const SignupForm = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const classes = useStylesAuthForm();
  return (
    <div className={classes.root}>
      <div className={classes.authBoxContainer}>
        <div className={classes.authBox}>
          <AuthForm
            header="新規登録"
            button="アカウントを作成する"
            buttonColor="primary"
            handleAuth={handleSingup}
            setIsClicked={setIsClicked}
          />
          <Typography variant="subtitle1" component="p">
            アカウントをお持ちの方はこちら
            <br />
            <Link href="/auth/signin">
              <a>サインイン</a>
            </Link>
          </Typography>
        </div>
      </div>
      {isClicked ? <AuthCircular message="アカウント作成中" /> : null}
    </div>
  );
};

const Signup = () => (
  <BackgroundDiv>
    <SignupForm />
  </BackgroundDiv>
);

export default Signup;
