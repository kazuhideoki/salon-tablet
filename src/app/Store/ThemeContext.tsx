import React from "react";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { themeMinimal } from "./themeMinimal";

const screenWidth = 100
const screenHeight = 100


const portalPadding = 0

const portalWidth = screenWidth - portalPadding * 2
const portalHeight = screenHeight - portalPadding * 2

const pHeaderMarginBottom = 1
const pHeaderWidth = screenWidth - portalPadding * 2
const pHeaderHeight = 7

const pFooterMarginTop = 1
const pFooterWidth = screenWidth - portalPadding * 2
const pFooterHeight = 23

const pMainMargin = 1
const pMainWidth = screenWidth - pMainMargin * 2
const pMainHeight = screenHeight - pHeaderHeight - pHeaderMarginBottom - pFooterHeight - pFooterMarginTop - portalPadding * 2


// ThemeContext.Providerを通して渡される値
const themeArgs = {
  app: {
    padding: portalPadding,
    width: portalWidth,
    height: portalHeight,
  },
  pHeader: {
    marginBottom: pHeaderMarginBottom,
    width: pHeaderWidth,
    height: pHeaderHeight,
  },
  pMain: {
    width: pMainWidth,
    height: pMainHeight,
  },
  pFooter: {
    marginTop: pFooterMarginTop,
    width: pFooterWidth,
    height: pFooterHeight,
  },

  drawerWidth: 210,

  // fontSize
  icon: 85,
  iconSmall: 38,
}

export type TThemeArgs = typeof themeArgs;

type TThemeContext = {
  selectedTheme: string,
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>,
} & TThemeArgs

export const ThemeContext = React.createContext({} as TThemeContext);



export const ThemeProvider = ({ children }: any) => {

    const [selectedTheme, setSelectedTheme] = React.useState("nonTheme");

    let theme
    switch (selectedTheme) {
      case "nonTheme":
      theme = null;
        break;
      case "minimal":
      theme = themeMinimal;
        break;

      default:
        break;
    } 

    const themeValue = {
      ...themeArgs,
      selectedTheme,
      setSelectedTheme,
    };

    return (
      // これでmaterial uiのthemeオブジェクトを下へ送る
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {/* 独自設定した変数を下へ送る */}
        <ThemeContext.Provider value={themeValue}>
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    );
};

export default ThemeProvider;

