import React, { DOMElement } from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Store } from '../Store/Store'
import { UpdateButton } from './viewComponents/buttons/UpdateButton'
import dynamic from 'next/dynamic';
import { Edit } from '@material-ui/icons';
import { EditButtonsBox } from './viewComponents/buttons/EditButtonsBox';
// const ReactQuill = dynamic(() => import("react-quill"), {
//   ssr: false,
// });

const useInfoBarProps = () => {

  const { appState, dispatchAppState } = React.useContext(Store);
  const { infoBarData, isSetting } = appState;
  const { infoBar, targetArticle } = infoBarData;
  const { shop_name } = appState.userInfo

  const handleOnClick = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_info_bar" });
  };

  return {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    handleOnClick,
    shop_name,
  };
}

export type TUseInfoBarProps = ReturnType<typeof useInfoBarProps>

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    editButtonsBox: {
      position: "absolute",
      top: theme.spacing(1),
      right: 0,
      zIndex: 100,
    },
    scrollingSentenceDiv: {
      margin: 'auto',
      width: '96%',
      lineHeight: '1.5em',
      textAlign : 'center',
      // border     : '1px solid #666';
      // color      : '#000000';
      // background : '#fff';
      overflow   : 'hidden',
    },
    scrollingSentence: {
      display     : 'inline-block',
      // display     : 'inline',
      paddingLeft: '100%',
      whiteSpace : 'nowrap',
      lineHeight : '1em',
      animation   : '$scrollAnime 24s linear infinite',
    },
    "@keyframes scrollAnime": {
      // '0%': { transform: 'translateX(0)'},
      from: { transform: 'translateX(0)'},
      // '100%': { transform: 'translateX(-100%)'},
      to: { transform: 'translateX(-100%)'},
    },
    '@global': {
      '#scrolling_sentence_dangerously_set_inner_html > *': {
        display: 'inline-block',
      }
    },
  });
})

export const InfoBarPresenter: React.FC<TUseInfoBarProps> = (props) => {
         const classes = useStyles();

         const ref = React.useRef(null)

         let displayInfoBar = <></>;
         switch (props.infoBar.info_bar_type) {
           case "shop_name":
             displayInfoBar = (
               <Typography align="center" variant="h5">
                 {props.shop_name || "SALON TABLET"}
               </Typography>
             );
             break;
           case "scrolling_sentence":
             displayInfoBar = (
               <div className={classes.scrollingSentenceDiv}>
                 <div
                   dangerouslySetInnerHTML={{
                    //  __html: `<nobr>${props.infoBar.scrolling_sentence}</nobr>`,
                     __html: `${props.infoBar.scrolling_sentence}`,
                   }}
                   className={classes.scrollingSentence}
                   id='scrolling_sentence_dangerously_set_inner_html'
                 />
               </div>
             );
             break;
           case "article":
             displayInfoBar = (
               <div
                 onClick={() =>
                   props.dispatchAppState({
                     type: "OPEN_ARTICLE_MODAL_FROM_INFO_BAR",
                     payload: props.targetArticle,
                   })
                 }
               >
                 <Typography variant="caption">
                   <span id="scrolling_sentence" ref={ref}>
                     <b>{props.targetArticle.title}</b>
                     {"  "}
                     {props.targetArticle.article_excerpt}
                   </span>
                 </Typography>
                 {/* <Typography variant="caption"></Typography> */}
               </div>
             );
             break;

           default:
             break;
         }

        //  React.useEffect(() => {
        //    if (process.browser) {
        //      console.log('infoBarのuseEffect,process.browserだよ');
             
        //      const scrollingSentence = document.getElementById(
        //        "scrolling_sentence"
        //      );
        //      console.log("scrollingSentenceは " + scrollingSentence);
        //      console.log("refは " + JSON.stringify(ref));
             
        //     //  if (ref) {
        //     //    ref.あcurrent.scrollTo({
        //     //      left: 500,
        //     //      behavior: "smooth",
        //     //    });
        //     //  }
        //     if (scrollingSentence) {
        //       scrollingSentence.scrollTo({
        //         left: 500,
        //         behavior: "smooth",
        //       });
        //     }
             
        //    }
        //  },[ref])

         return (
           <div className={classes.root}>
             {props.isSetting ? (
               <EditButtonsBox className={classes.editButtonsBox}>
                 <UpdateButton onClick={props.handleOnClick} />
               </EditButtonsBox>
             ) : null}
             {displayInfoBar}
           </div>
         );
       };

export const InfoBar = () => {
  const props = useInfoBarProps()

  return <InfoBarPresenter {...props}/>
}

export default InfoBar
