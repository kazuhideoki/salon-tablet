import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WebsiteAppBar from './WebsiteAppBar';
import Link from 'next/link';
import {
  Home,
  Tablet,
  MobileFriendly,
  FormatQuote,
  AccountCircle,
  PersonAdd,
} from '@material-ui/icons';
import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const pageList = [
  ['Home', '/', <Home key={0} />],
  ['サンプル Tablet', '/sample/tablet', <Tablet key={1} />],
  ['サンプル Mobile(製作中)', '/sample/mobile', <MobileFriendly key={2} />],
  ['FAQ(製作中)', '/faq', <FormatQuote key={3} />],
  ['新しくアカウントを作成する', '/auth/signup', <PersonAdd key={4} />],
  ['サインイン', '/auth/signin', <AccountCircle key={5} />],
] as [string, string, JSX.Element][];

type Props = {
  id: string;
};

export const WebSiteDrawer: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {pageList.map((value, index) => (
          <Link href={value[1]} key={index}>
            <ListItem button>
              <ListItemIcon>{value[2]}</ListItemIcon>
              <ListItemText primary={value[0]} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <WebsiteAppBar {...props} onClick={toggleDrawer('top', true)} />
      <Drawer
        anchor={'top'}
        open={state['top']}
        onClose={toggleDrawer('top', false)}>
        {list('top')}
      </Drawer>
      {props.children}
    </>
  );
};
export default WebSiteDrawer;
