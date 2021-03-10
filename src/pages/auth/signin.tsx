import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { AuthForm } from '../../app/components/pages/AuthFrom';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../../util/auth/initFirebase';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { AuthCircular } from '../../app/components/AuthCircular';
import { apiGetSession } from '../../util/db/apiGetSession';
import { SEO } from '../../app/components/pages/SEO';

export const useStyles = (isTabletPortrait: boolean) =>
  makeStyles((theme: Theme) => {
    return createStyles({
      root: {
        position: 'absolute',
        // next/imageだとうまくレスポンシブできなかった
        backgroundImage: "url('/images/feature_img_signin.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        '&::before': {
          backgroundColor: 'rgba(0,0,0,0.4)',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          content: '""',
        },
      },
      authBoxContainer: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 450,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        marginLeft: 'auto',
        marginRight: isTabletPortrait ? 'auto' : 0,
      },
      authBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        margin: 'auto',
        borderRadius: theme.spacing(2),
        padding: theme.spacing(3),
        maxWidth: 300,
        maxHeight: 450,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
    });
  });

export const useStylesAuthForm = (): Record<
  'root' | 'authBoxContainer' | 'authBox',
  string
> => {
  const isTabletPortrait = useMediaQuery('(max-width:800px)');
  return useStyles(isTabletPortrait)();
};
initFirebase();

const handleSignin = async (email: string, password: string) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const SigninForm = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const classes = useStylesAuthForm();

  return (
    <>
      <div className={classes.authBoxContainer}>
        <div className={classes.authBox}>
          <AuthForm
            header="サインイン"
            button="サインイン"
            handleAuth={handleSignin}
            setIsClicked={setIsClicked}
          />
          <Typography variant="subtitle1" component="p">
            アカウントをお持ちでないですか？
            <br />
            <Link href="/auth/signup">
              <a>無料でアカウントを作る</a>
            </Link>
          </Typography>
        </div>
      </div>
      {isClicked ? <AuthCircular message="読み込み中" /> : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await apiGetSession({ req: context.req });
    if (session) {
      context.res.writeHead(302, { Location: '/' });
      context.res.end();
    }

    return { props: {} };
  } catch (err) {
    console.log(`signin.tsx gSSP: ${err}`);
    return { props: {} };
  }
};

// 背景再レンダリング防ぐために別の関数コンポーネントに定義
export const BackgroundDiv: React.FC = ({ children }) => {
  const classes = useStylesAuthForm();
  return <div className={classes.root}>{children}</div>;
};

const Signin = (): JSX.Element => (
  <>
    <SEO title="サインイン" />
    <BackgroundDiv>
      <SigninForm />
    </BackgroundDiv>
  </>
);

export default Signin;
