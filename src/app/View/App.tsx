import React from "react";
import clsx from "clsx";
import { Grid, CircularProgress, makeStyles, createStyles, Theme, useMediaQuery } from "@material-ui/core";
import { PModal } from "./PModal/PModal";
import { PMain } from "./PMain/PMain";
import { PFooter } from "./PFooter/PFooter";
import { Store } from "../Store/Store";
import { ThemeContext } from "../Store/ThemeContext";
import { useGetArticles } from "../ActionCreator/articles/useGetArticles";
import { StoreContextProviderProps } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { EditorContextProvider } from "../Store/EditorContext";
import { Drawer } from "./Drawer";
import { PHeader } from "./PHeader";
import { AppMobile } from "./mobile/AppMobile";

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
    const isLoading = loading.mainArticles;
    const getArticles = useGetArticles();

    // Drawer用
    const [open, setOpen] = React.useState(false);

    return (
      <div className={classes.root}>
        <Drawer open={open} setOpen={setOpen}>
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
              <PHeader/>
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
                  thickness={10}
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
              <PFooter />
            </Grid>
            <PModal />
          </Grid>
        </Drawer>
      </div>
    );

}
// import { signin, signout, useSession, getSession } from "next-auth/client";


const AppView = () => {
  // const [session, loading] = useSession();
  // console.log("App.tsxのsessionは " + JSON.stringify(session));

  const isMobile = useMediaQuery("(max-width:480px)");
  const { appState, dispatchLoading } = React.useContext(Store);
  const getArticles = useGetArticles()

   // 初回ロード時に二回ロードしてしまうので、応急処置的に初回読み込みをしないようにした。
    const [isFirstLoad, setIsFirstLoad] = React.useState(true);
    // 設定モード[isSetting]を切り替えるたびに記事を読み込み直す
    React.useEffect(() => {
      if (!isFirstLoad) {  
        // 二回目以降で発火 
        dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
        getArticles(1);
      }
      setIsFirstLoad(false);
    },[appState.isSetting])

  if (isMobile && appState.isSetting) {
    return <AppMobile/>
  } else {
    return <AppTablet/>
  }

}


export const App = (props:StoreContextProviderProps) => {
  
  
  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider data={props.data}>
      <ThemeProvider>
        <EditorContextProvider>
          <AppView/>
        </EditorContextProvider>
      </ThemeProvider>
    </StoreContextProvider>
  );
}

export default App