import React from "react";
import { Typography, makeStyles, createStyles, useMediaQuery, Button } from "@material-ui/core";
import Link from "next/link";
import { TopPageParagraph } from "./TopPageParagraph";
import { AboutST } from "./AboutST";
import { server } from "../lib/loadUrl";
// import { ParallaxProvider, Parallax, useController, } from 'react-scroll-parallax';
import { Parallax, Background } from 'react-parallax';
import { SignInForm, SignInFormMail } from "../pages/auth/signin";
import { PlainButton } from "./PlainButton";



const useStyles = makeStyles((theme) =>
createStyles({
    featureImgDiv: {
      height: 800,
      minHeight: '80%',
      maxHeight: '100%',
    },
    msgBox: {
      position: "absolute",
      top: "30%",
      left: "15%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    h1: {
      fontFamily: 'serif',
      background: "rgba(255,255,255,0.6);",
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
      // position: "absolute",
      // top: "30%",
      // left: "15%",
      // transform: "translate(-50%,-50%)"
    },
    startButton: {
      fontFamily: 'serif',
      fontSize: '1.5em',
      background: "rgba(255,255,255,0.6);",
    },
    img: {
      zIndex: 0,
      opacity: 0.5,

      maxWidth: 1000,
      marginLeft: "calc((-1000px + 100%) / 2)",

    },
    mainContents: {
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: 800,
        objectFit: 'cover',
        position: 'relative',
        zIndex: 100,


      },
    topPageParagraph: {
      margin: theme.spacing(7,0),
    },
    signInForm: {
      margin: theme.spacing(2),
    },
  }
))

type Props = { csrfToken: string, providers: any };

export const TopPage: React.FC<Props> = (props) => {
  const classes = useStyles()

  const [newEmail, setNewEmail] = React.useState('')

  const isMobile = useMediaQuery("(max-width:480px)");

 
  // const imgFile = isMobile ? 'feature_img_original.jpg' : 'feature_img_lower.jpg'
  const imgFile = 'feature_img_lower.jpg'

  return (
    <>
    <div className={classes.mainContents}>
      <Parallax bgImage={`${server}/images/${imgFile}`} strength={300}>
      <div className={classes.featureImgDiv}>
        <div className={classes.msgBox}>
          <Typography variant='h5' component='h1' align='center' className={classes.h1}>
            「美容室」<br/>×<br/>「タブレット」<br/>をより良く
          </Typography>
          <Link href="/auth/signin">
            <PlainButton className={classes.startButton} variant='text'>
              無料で始める
            </PlainButton>
          </Link>

        </div>
      </div>
    </Parallax>

      {/* <TopPageParagraph className={classes.topPageParagraph}/> */}

      <AboutST/>
      {/* <SignInForm className={classes.signInForm} csrfToken={props.csrfToken} providers={props.providers}/> */}
      <SignInFormMail csrfToken={props.csrfToken} newEmail={newEmail} setNewEmail={setNewEmail}/>
      
    </div>
    </>
  );

};
