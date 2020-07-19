import React from "react";
import clsx from "clsx";
import { Grid, CircularProgress, makeStyles, createStyles, Theme, useMediaQuery } from "@material-ui/core";
import { Modal } from "./Modal/Modal";
import { PMain } from "./Main/PMain";
import { Footer } from "./Footer/Footer";
import { Store } from "../Store/Store";
import { ThemeContext } from "../Store/ThemeContext";
import { useGetArticles } from "../ActionCreator/articles/useGetArticles";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { EditorContextProvider } from "../Store/EditorContext";
import { Drawer } from "./Drawer/Drawer";
import { Header } from "./Header";
import { AppMobile } from "./mobile/AppMobile";
import { server } from "../../config";
import { IndexProps } from "../../pages";
import { ModalContext, ModalContextProvider } from "./Modal/ModalContext";

// 3段のコンテナの整形に関してのみ記述, 
// 枠の設定、header,footerの最大値の設定

const useStyles = makeStyles((theme: Theme) => {
    const themes = React.useContext(ThemeContext);
    return createStyles({
      root: {
        overflow: "hidden",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        padding: `${themes.app.padding}vh ${themes.app.padding}vw`,
      },
      gridRoot: {
        height: "100%",
        position: "relative",
      },
      header: {
        width: themes.pHeader.width + "vw",
        height: themes.pHeader.height + "vh",
        marginBottom: themes.pHeader.marginBottom + "vh",

      },
      headerOpened:{
        width: `calc(${themes.pHeader.width}vw - ${themes.drawerWidth}px)`,
      },
      main: {
        width: themes.pMain.width + "vw",
        height: themes.pMain.height + "vh",
        position: "relative",
      },
      mainOpened: {
        width: `calc(${themes.pMain.width}vw - ${themes.drawerWidth}px)`,
      },
      footer: {
        marginTop: themes.pFooter.marginTop + "vh",
        width: themes.pFooter.width + "vw",
        height: themes.pFooter.height + "vh",
      },
      footerOpened: {
        width: `calc(${themes.pFooter.width}vw - ${themes.drawerWidth}px)`,
      },
      circularProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
      //  drawerの開閉のアニメーション
      content: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      //  drawerの開閉のアニメーション
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    });
});

const AppTablet = ()=> {
  // スタイルを反映させたclassNameを出力
    const classes = useStyles();

    const { appState, dispatchAppState, loading, dispatchLoading } = React.useContext(Store);
    const open = appState.isDrawerOpen
    const isLoading = loading.mainArticles;
    const getArticles = useGetArticles();

    return (
      <div className={classes.root}>
        <Drawer>
          <Grid
            spacing={0}
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.gridRoot}
          >
            <Grid item className={`${clsx(classes.content, {
              [classes.contentShift]: open,
            })} ${classes.header} ${open ? classes.headerOpened : null}`}>
              <Header/>
            </Grid>
            <Grid
              item
              // mainOpenedでDrawerの開閉時のCSSを適応
              className={`${clsx(classes.content, {
                [classes.contentShift]: open,
              })} ${classes.main} ${open ? classes.mainOpened : null}`}
            >
              {loading.mainArticles ? (
                <CircularProgress
                  className={classes.circularProgress}
                  size={100}
                  thickness={5}
                />
              ) : (
                <PMain />
              )}
            </Grid>
            <Grid
              item
              // footerOpenedでDrawerの開閉時のCSSを適応
              className={`${clsx(classes.content, {
                [classes.contentShift]: open,
              })} ${classes.footer} ${open ? classes.footerOpened : null}`}
            >
              <Footer />
            </Grid>
          </Grid>
        </Drawer>
      </div>
    );

}


const AppView = () => {

  const isMobile = useMediaQuery("(max-width:480px)");
  const { appState, dispatchAppState, dispatchLoading, userInfo } = React.useContext(Store);
  const getArticles = useGetArticles()
  const { user_id, is_first_sign_in } = userInfo
  console.log("AppViewのis_first_sign_inは " + is_first_sign_in);
  

  // 初回ロード時に二回ロードしてしまうので、応急処置的に初回読み込みをしないようにした。
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  // 編集モード[isSetting]を切り替えるたびに記事を読み込み直す
  // ※※→いずれuseEffect使わないようにするか❓
  React.useEffect(() => {
    if (!isFirstLoad) {  
      // 二回目以降で発火 
      getArticles(1);
    }
    setIsFirstLoad(false);
  },[appState.isSetting])

  // パスワード未設定でユーザー情報登録へ遷移 → 手間な感じがするので、indexのserverSidePropsでやってもいいかも、要検討
  //@ts-ignore
  React.useEffect(async() => {
    if (userInfo.isSetPassword === false) {
      dispatchAppState({ type: "OPEN_MODAL", payload: "setting_user_info" })
    }

  },[])

  if (isMobile && appState.isSetting) {
    return <AppMobile/>
  } else {
    return <AppTablet/>
  }

}


export const App = (props: IndexProps) => {
  
  
  return (
    // <ThemeProvider >
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider data={props.data}>
      <ThemeProvider {...props.data.session}>
        <EditorContextProvider {...props.data.session}>
          <AppView />
          <ModalContextProvider>
            <Modal />
          </ModalContextProvider>
        </EditorContextProvider>
      </ThemeProvider>
    </StoreContextProvider>
    // </ThemeProvider>
  );
}

export default App