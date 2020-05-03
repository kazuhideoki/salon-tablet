import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { VideoLabel, NoteAddOutlined, Settings, Close } from "@material-ui/icons";
import { Store } from "../Store/Store";
import { EditorContext } from "../Store/EditorContext";

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
        left: theme.spacing(4),
      },
    },
    // Tooltipのラベルの表示を整形
    staticTooltipLabel: {
      width: "max-content",
    },
  })
);

// 上が下に来る
const useActions = () => {
  const { dispatchAppState } = React.useContext(Store)
  const { setEditorText, setTitleText, setFooterItemEditorText, setIconName } = React.useContext(EditorContext)
  const handleOpenArticleEditor = () => {
    dispatchAppState({type: "OPEN_MODAL", payload: 'edit_article'})
    setTitleText('')
    setEditorText('')
  }
  
  // ★★★後で作る
  // const handleOpenFooterItemEditor = () => {
  //   dispatchAppState({type: "OPEN_MODAL", payload: 'edit_article'})
  //   setIconName('')
  //   setFooterItemEditorText('')
  // }

  return [
  { 
    icon: <VideoLabel onClick={() => dispatchAppState({type: "OPEN_MODAL", payload: 'edit_footer_icon'})}/>,
    name: "フッターアイコン追加"
    // name: "New Icon"
  },
  { 
    icon: <NoteAddOutlined onClick={() => handleOpenArticleEditor()} />,
    // name: "新規投稿"
    name: "New Article"
  },
]}

type Props = {
  className?: string
  handleOpen?: () => void
  handleClose?: () => void
}
export const SettingButtonOpened = ({
  className,
  // handleOpen,
  // handleClose
}:Props) => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const { appState, dispatchAppState } = React.useContext(Store)
  const actions = useActions()

  const handleClose = () => {
    dispatchAppState({ type: "OFF_IS_SETTING" });
  };

  const handleOpen = () => {
    dispatchAppState({type: "ON_IS_SETTING"});
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial SettingO
      ButtonOpened"
      // propsでSettingButtonと同じものを渡すように
      className={className}
      hidden={hidden}
      // onCloseを除き, SpeedDialIconにonClickをつけることでアイコンをタップしたときのみ戻る。
      // onClose={handleClose}
      icon={
        <SpeedDialIcon
          icon={<Settings />}
          openIcon={<Close />}
          onClick={() => handleClose()}
        />
      }
      onOpen={() => handleOpen()}
      open={appState.isSetting}
      direction={"up"}
    >
      {actions.map((action, index) => (
        <SpeedDialAction
          key={index}
          icon={action.icon}
          tooltipOpen
          tooltipTitle={action.name}
          // TooltipClassesがうまくいかなかったので直接classesにいれた↓
          // TooltipClasses={classes.tooltip}
          classes={{ staticTooltipLabel: classes.staticTooltipLabel }}
        />
      ))}
    </SpeedDial>
  );
}