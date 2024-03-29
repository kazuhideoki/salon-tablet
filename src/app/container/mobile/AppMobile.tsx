import React from 'react';
import { MainMobile } from './MainMobile/MainMobile';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Drawer } from '../tablet/Drawer/Drawer/Drawer';
import InfoBar from '../tablet/InfoBar/InfoBar';
import { PaginationBar } from '../tablet/Footer/PaginationBar/PaginationBar';
import { ThemeArgs, ThemeContext } from '../../stores/theme/ThemeProvider';
import { AppStateContext } from '../../stores/appState/Context';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
    },
    gridRoot: {
      width: '100vw',
      position: 'relative',
    },
    gridRootOpen: {
      width: (themes: ThemeArgs) => `calc(100vw - ${themes.drawerWidth}px)`,
    },
    infoBar: {
      width: '100vw',
      height: 60,
    },
    infoBarOpened: {},
    main: {
      width: '100vw',
    },
    mainOpened: {},
    footer: {
      position: 'sticky',
      bottom: 0,
      width: '100vw',
    },
    footerOpened: {},
    isLoadingFooter: {
      position: 'fixed',
    },
    emptyMain: {
      flexGrow: 1,
    },
    circularProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  });
});

export const AppMobile = () => {
  const themes = React.useContext(ThemeContext);
  const classes = useStyles(themes);
  const { appState } = React.useContext(AppStateContext);
  const open = appState.isDrawerOpen;

  return (
    <div className={classes.root}>
      <Drawer>
        <div
          className={`${classes.gridRoot} ${
            appState.isDrawerOpen ? classes.gridRootOpen : ''
          }`}>
          <InfoBar
            className={`${classes.infoBar} ${
              open ? classes.infoBarOpened : null
            }`}
          />
          <MainMobile
            className={`${classes.main} ${open ? classes.mainOpened : null}`}
          />
        </div>
        <PaginationBar
          className={`${classes.footer} ${open ? classes.footerOpened : null} ${
            appState.loading.main ? classes.isLoadingFooter : null
          }`}
        />
      </Drawer>
    </div>
  );
};
