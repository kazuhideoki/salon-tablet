import React from 'react'
import { MainMobile, useMainMobileProps } from './MainMobile'
import { FooterMobile, useFooterMobileProps } from './FooterMobile'
import { SettingMobile } from "./SettingMobile";
import { TabMobile } from './TabMobile'
import { PaginationMobile } from './PaginationMobile';
import { Modal } from '../Modal/Modal';
import { makeStyles, createStyles, Theme, Button, CircularProgress, Drawer } from "@material-ui/core";
import { HomeButton } from '../Footer/PaginationBar/HomeButton';
import { Store } from '../../Store/Store';
import { useGetArticles } from '../../ActionCreator/articles/useGetArticles';
import { Home } from '@material-ui/icons';
import { useDrawerProps } from '../Drawer/Drawer';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    quitButton: {
      width: "100%",
      backgroundColor: "whitesmoke",
    },
    createButton: {
      width: "100%",
    },
    emptyMain: {
      flexGrow: 1,
    },
    circularProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    tabMobile: {
      // position: "absolute",
      // bottom: 0,
      height: "auto",
    },
  });
});

export const AppMobile = () => {
  const classes = useStyles()
  const [tab, setTab] = React.useState(0)
  const { dispatchAppState, appState} = React.useContext(Store)
  const getArticles = useGetArticles()

  const onClickOffIsSetting = () => {
    dispatchAppState({type: "CLOSE_DRAWER"})
    getArticles(false, 1, appState.selectedArticlesTags, false);

  }

  let Display: React.FC
  switch (tab) {
    case 0:
      Display = () => (
        <>
          <Button
            color="primary"
            className={classes.createButton}
            onClick={() => dispatchAppState({ type: "OPEN_ARTICLE_EDITOR" })}
          >
            記事作成
          </Button>
          {appState.loading.main ? (
            <div className={classes.emptyMain}>
              <CircularProgress className={classes.circularProgress} />
            </div>
          ) : (
            <MainMobile />
          )}
          <PaginationMobile />
        </>
      );
      break;
    case 1:
      Display = () => (
        <>
          <Button
            color="primary"
            className={classes.createButton}
            onClick={() => dispatchAppState({type: "OPEN_FOOTER_ITEM_EDITOR"})}
          >
            アイテム追加
          </Button>
          <FooterMobile />
        </>
      );
      break;
    case 2:
      Display = () => <SettingMobile />;
      break;
  
    default:
      break;
  }

  return (
    <>
      <div className={classes.root}>
        <Drawer>
          <Button className={classes.quitButton} onClick={() => onClickOffIsSetting()}>観覧モードに切り替える</Button>
          <Display />
          <TabMobile tab={tab} setTab={setTab} className={classes.tabMobile}/>
        </Drawer>
      </div>
    </>
  );
}
