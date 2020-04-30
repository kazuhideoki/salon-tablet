import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { VideoLabel, NoteAddOutlined, Settings, Close } from "@material-ui/icons";
import { Store } from "../Store/Store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(4),
        right: theme.spacing(4),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(4),
        left: theme.spacing(4 ),
      },
    },
    tooltip: {
      width: 'max-content'
    }
  })
);

// 上が下に来る
const actions = [
  { icon: <VideoLabel />, name: "フッターアイコン追加" },
  { icon: <NoteAddOutlined />, name: "新規投稿" },
];

export const SettingButton = () => {
  const classes = useStyles();
  const { dispatchAppState } = React.useContext(Store)
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAndSetting = () => {
    dispatchAppState({ type: 'TOGGLE_IS_SETTING' })
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenAndSetting = () => {
    dispatchAppState({type: 'TOGGLE_IS_SETTING'})
    setOpen(true);
  }


  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      hidden={hidden}
      // onCloseを除き, SpeedDialIconにonClickをつけることでアイコンをタップしたときのみ戻る。
      icon={<SpeedDialIcon icon={<Settings />} openIcon={<Close/>} onClick={() => handleClose()}/>}
      // icon={<Settings onClick={() => handleClose()}/>}
      // onClose={handleClose}
      onOpen={() => handleOpen()}
      open={open}
      direction={"up"}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipOpen
          tooltipTitle={action.name}
          TooltipClasses={classes.tooltip}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
}
