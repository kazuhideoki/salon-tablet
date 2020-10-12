import { T_selected_theme } from "../Types";
import { TThemeParams } from "../ThemeContext";
import { selectedIconReducer } from "../../Reducer/selectedIconReducer";

const nonTheme: TThemeParams = {
  selected_theme: "nonTheme",
  theme_color: "#3f51b5",
  theme_font1: "未設定",
  theme_font2: '"ヒラギノ角ゴ ProN"',
  theme_font_heading: '"ヒラギノ角ゴ ProN"',
};
const minimal: TThemeParams = {
  selected_theme: "minimal",
  theme_color: "#134E78",
  theme_font1: "未設定",
  theme_font2: '"M PLUS Rounded 1c"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};
const white: TThemeParams = {
  selected_theme: 'white',
  theme_color: "#263238",
  theme_font1: "未設定",
  theme_font2: '"M PLUS Rounded 1c"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};             

const natural: TThemeParams = {
  selected_theme: 'natural',
  theme_color: "#5d4037",
  theme_font1: "未設定",
  theme_font2: '"Noto Serif JP"',
  theme_font_heading: '"M PLUS Rounded 1c"',
};

export const generateParamsFromTheme = (
         selectedTheme: T_selected_theme
       ): TThemeParams => {
         switch (selectedTheme) {
           case "nonTheme":
             return nonTheme;
           case "minimal":
             return minimal;
           case "white":
             return white;
           case "natural":
             return natural;

           default:
             break;
         }
       };

export const isParamsChanged = (themeParams: TThemeParams) => {
  return themeParams === generateParamsFromTheme(themeParams.selected_theme);
}