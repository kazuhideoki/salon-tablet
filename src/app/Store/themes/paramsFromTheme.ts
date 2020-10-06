import { T_selected_theme } from "../Types";
import { TThemeParams } from "../ThemeContext";

export const generateParamsFromTheme = (
         selectedTheme: T_selected_theme
       ): TThemeParams => {
         let params: TThemeParams;
         switch (selectedTheme) {
           case "nonTheme":
             params = {
               selected_theme: selectedTheme,
               theme_color: "#3f51b5",
               theme_font1: "未設定",
               theme_font2: "ヒラギノ角ゴシック",
             };
             break;
           case "minimal":
             params = {
               selected_theme: selectedTheme,
               theme_color: "#134E78",
               theme_font1: "未設定",
               theme_font2: '"M PLUS Rounded 1c"',
             };
             break;
           case "white":
             params = {
               selected_theme: selectedTheme,
               theme_color: "#263238",
               theme_font1: "未設定",
               theme_font2: '"M PLUS Rounded 1c"',
             };
             break;
           case "natural":
             params = {
               selected_theme: selectedTheme,
               theme_color: "#5d4037",
               theme_font1: "未設定",
               theme_font2: "源ノ明朝",
               //  theme_font2: '"Noto Serif JP"',
             };
             break;

           default:
             break;
         }

         return params;
       };