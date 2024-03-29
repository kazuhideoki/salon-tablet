import React from 'react';
import {
  CssBaseline,
  MuiThemeProvider,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import {
  UserInfo,
  ThemeFont,
  SelectedTheme,
  FooterIconSize,
} from '../../../util/interface/Interface';
import { switchingTheme } from './lib/paramsFromTheme';
import { UserInfoContext } from '../userInfo/Context';

const screenWidth = 100;
const screenHeight = 100;

const portalPadding = 0;

const portalWidth = screenWidth - portalPadding * 2;
const portalHeight = screenHeight - portalPadding * 2;

// const pInfoBarMarginBottom = 1
const pInfoBarWidth = screenWidth - portalPadding * 2;
// const pInfoBarHeight = 7

// const pFooterMarginTop = 1
const pFooterWidth = screenWidth - portalPadding * 2;
// const pFooterHeight = 26
// const pFooterHeight = 26

const pMainMargin = 1;
const pMainWidth = screenWidth - pMainMargin * 2;
// const pMainHeight = screenHeight - pInfoBarHeight - pInfoBarMarginBottom - pFooterHeight - pFooterMarginTop - portalPadding * 2

// ThemeContext.Providerを通して渡される値
export const useThemeArgs = (footer_icon_size: FooterIconSize) => {
  const isTabletPortrait = useMediaQuery('(max-width:800px)');

  const theme = useTheme();

  const args = {
    app: {
      padding: portalPadding,
      width: portalWidth,
      height: portalHeight,
    },
    pInfoBar: {
      width: pInfoBarWidth,
      height: '50px',
    },
    pMain: {
      width: pMainWidth,
      height: function (margin: number) {
        return `100vh - ${args.pFooter.height} - ${args.pagination.height} - ${
          args.pInfoBar.height
        } - ${margin * 2}px`;
      },
    },

    pagination: {
      width: pFooterWidth,
      // ※アイコンのサイズなどを変えると変わる可能性ある、ぴったりなので
      height: isTabletPortrait ? '140px' : '74px',
    },
    pFooter: {
      width: pFooterWidth,
      height: footer_icon_size === 'medium' ? '145px' : '120px',
    },
    margin: theme.spacing(1),

    drawerWidth: 210,

    // fontSize
    // icon: 85,
    icon: footer_icon_size === 'medium' ? 85 : 60,
    iconSmall: 38,
  };

  return args;
};

export type ThemeArgs = ReturnType<typeof useThemeArgs>;

export const ThemeContext = React.createContext({} as ThemeArgs);

export type ThemeParams = {
  selected_theme: SelectedTheme;
  theme_color: string;
  theme_font1: ThemeFont;
  theme_font2: ThemeFont;
  theme_font_heading: ThemeFont;
};

export const ThemeProvider: React.FC<UserInfo> = (props) => {
  const { userInfo } = React.useContext(UserInfoContext);

  const {
    selected_theme,
    theme_color,
    theme_font1,
    theme_font2,
    theme_font_heading,
    footer_icon_size,
  } = userInfo;
  const params: ThemeParams = {
    selected_theme,
    theme_color,
    theme_font1,
    theme_font2,
    theme_font_heading,
  };

  const theme = switchingTheme(params);

  return (
    // これでmaterial uiのthemeオブジェクトを下へ送る
    <MuiThemeProvider theme={theme}>
      {/* MuiCssBaseline、@globalが適応 */}
      <CssBaseline />
      {/* 独自設定した変数を下へ送る */}
      <ThemeContext.Provider value={useThemeArgs(footer_icon_size)}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
