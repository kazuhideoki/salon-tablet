import React from "react";
import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { PModal } from "./PModal/PModal";
import { PMain } from "./PMain";
import { PFooter } from "./PFooter/PFooter";
import { SettingSwitch } from "./Setting/SettingSwitch";
import { Store } from "../Store/Store";
import { ThemeType } from "../Store/ThemeContext";
import { useStylesFactory } from "../Store/useStylesFactory";
import { useGetArticles } from "../ActionCreator/articles/useGetArticles";
import { StoreContextProviderProps } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { EditorContextProvider } from "../Store/EditorContext";



// 3段のコンテナの整形に関してのみ記述, 
// 枠の設定、header,footerの最大値の設定
const styles = {
    // vh,vwでデバイスの向きに対応することができる。
    root: {
        overflow: "hidden",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        padding: (themes: ThemeType) => `${themes.app.padding}vh ${themes.app.padding}vw`,
    },
    gridRoot: {
        height: '100%'
    },
    header: {
        marginBottom: (themes: ThemeType) => themes.pHeader.marginBottom + 'vh',
        width: (themes: ThemeType) => themes.pHeader.width + 'vw',
        height: (themes: ThemeType) => themes.pHeader.height + 'vh',
    },
    main: {
        width: (themes: ThemeType) => themes.pMain.width + 'vw',
        height: (themes: ThemeType) => themes.pMain.height + 'vh',
    },
    footer: {
        marginTop: (themes: ThemeType) => themes.pFooter.marginTop + 'vh',
        width: (themes: ThemeType) => themes.pFooter.width + 'vw',
        height: (themes: ThemeType) => themes.pFooter.height + 'vh',
    }
}

const AppView = ()=> {
  // useStylesFactoryでthemeContextから受け取った値をもとに、styleに定義したコンポーネントごとのスタイルを反映させたclassNameを出力
    const classes = useStylesFactory(styles)

    const { appState, dispatchAppState } = React.useContext(Store);
    const isLoading = appState.isLoading
    const endLoading = () => dispatchAppState({type: "END_LOADING"})
    const getArticles = useGetArticles();

    const props = {
    classes,
    isLoading,
    };
    type Props = typeof props

    // 設定モード[isSetting]を切り替えるたびに記事を読み込み直す
    React.useEffect(() => {
      getArticles(1);
    },[appState.isSetting])

    const AppPresenter = ({ classes, isLoading }: Props) => {
        return (
          <div className={classes.root}>
            <Grid
              spacing={0}
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.gridRoot}
            >
              <Grid item className={classes.main}>
                {/* Skeltonはローディング中に表示させる */}
                {!isLoading ? <PMain /> : <Skeleton />}
              </Grid>
              <Grid item className={classes.footer}>
                <PFooter />
                <SettingSwitch/>
              </Grid>
              
              <PModal />
            </Grid>
          </div>
        );
    };



    return AppPresenter(props)
}

export const App = (props:StoreContextProviderProps) => {

  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider data={props.data}>
      <ThemeProvider>
        <EditorContextProvider>
          <AppView />
        </EditorContextProvider>
      </ThemeProvider>
    </StoreContextProvider>
  );
}

export default App