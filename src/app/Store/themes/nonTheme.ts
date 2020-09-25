import { createMuiTheme } from "@material-ui/core";
import { TThemeParams, themeArgs } from "../ThemeContext";
import { PanoramaSharp } from "@material-ui/icons";
import { FontNameToFontFamily } from "./fonts";

export const nonTheme = (params: TThemeParams) =>
         createMuiTheme({
           // overrides: {
           //   MuiCssBaseline: {
           //     "@global": {
           //       a: {
           //         color: "#134e78",
           //       }
           //     },
           //   },
           // },

           typography: {
             fontFamily: [
               FontNameToFontFamily(params.theme_font1),
               FontNameToFontFamily(params.theme_font2),
               "Arial",
               "sans-serif",
               '"Apple Color Emoji"',
               '"Segoe UI Emoji"',
               '"Segoe UI Symbol"',
             ].join(","),
           },
           palette: {
             primary: {
               main: params.theme_color,
             },
             secondary: {
               main: "#f50057", // デフォルト
             },
             // tonalOffset: 0.2,
           },

           props: {
             MuiPaper: {
               variant: "outlined",
             },
             MuiTextField: {
               variant: "outlined",
             },
             MuiButton: {
               variant: "contained",
             },
             MuiFormControl: {
               variant: "outlined",
             },
           },
         });
