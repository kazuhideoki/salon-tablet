import React from 'react'
import { MainMobile } from './MainMobile'
import { makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { Store } from '../../Store/Store';
import { useGetArticles } from '../../ActionCreator/articles/useGetArticles';
import { Drawer } from '../Drawer/Drawer';
import InfoBar from '../InfoBar';
import { PPagination } from '../Footer/PaginationBar/PPagination';
import { themeArgs, TThemeArgs, ThemeContext } from '../../Store/ThemeContext';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
    },
    gridRoot: {
      width: "100vw",
      position: "relative",
    },
    gridRootOpen: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    infoBar: {
      width: "100vw",
      height: 60,
    },
    infoBarOpened: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    main: {
      width: "100vw",
    },
    mainOpened: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    footer: {
      position: 'sticky',
      bottom: 0,
      width: "100vw",
    },
    footerOpened: {
      width: (themes: TThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
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
  });
});

export const AppMobile = () => {
  const themes = React.useContext(ThemeContext)
  const classes = useStyles(themes);
  const { appState} = React.useContext(Store)
  const open = appState.isDrawerOpen

  return (
    <div className={classes.root}>
      <Drawer>
        <div
          className={`${classes.gridRoot} ${
            appState.isDrawerOpen ? classes.gridRootOpen : ""
          }`}
        >

          <InfoBar
            className={`${classes.infoBar} ${open ? classes.infoBarOpened : null}`}
          />
          <MainMobile
            className={`${classes.main} ${open ? classes.mainOpened : null}`}
          />
          <PPagination
            className={`${classes.footer} ${open ? classes.footerOpened : null}`}
          />
        </div>
      </Drawer>
    </div>
  );
}
