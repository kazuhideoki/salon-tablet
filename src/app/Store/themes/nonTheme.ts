import { createMuiTheme } from "@material-ui/core";
import { TThemeParams } from "../ThemeContext";
import { PanoramaSharp } from "@material-ui/icons";
import { Deprecated_FontNameToFontFamily } from "./fonts";
import { secondaryColor } from "../../../lib/color/secondaryColor";

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
               params.theme_font1,
               params.theme_font2,
               "Arial",
               "sans-serif",
               '"Apple Color Emoji"',
               '"Segoe UI Emoji"',
               '"Segoe UI Symbol"',
             ].join(","),
             fontWeightLight: 200,
             fontWeightRegular: 300,
             fontWeightMedium: 400,
             fontWeightBold: 500,
             h1: {
               fontFamily: `${params.theme_font1}, ${params.theme_font_heading}`,
             },
             h2: {
               fontFamily: `${params.theme_font1}, ${params.theme_font_heading}`,
             },
             h3: {
               fontFamily: `${params.theme_font1}, ${params.theme_font_heading}`,
             },
             h4: {
               fontFamily: `${params.theme_font1}, ${params.theme_font_heading}`,
               fontWeight: 400,
             },
             h5: {
               fontFamily: `${params.theme_font1}, ${params.theme_font_heading}`,
               fontWeight: 400,
             },
             h6: {
               fontFamily: `${params.theme_font1}, ${params.theme_font_heading}`,
               fontWeight: 500,
             },
           },
           palette: {
             primary: {
               main: params.theme_color,
             },
             secondary: {
               //  main: "#f50057", // デフォルト
               main: secondaryColor(params.theme_color),
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
