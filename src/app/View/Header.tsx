import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Store } from '../Store/Store'
import { UpdateButton } from './viewComponents/buttons/UpdateButton'



const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }
  })
})

export const Header = () => {
  const classes = useStyles()
  const { appState, dispatchAppState } = React.useContext(Store)
  const { infoBar, isSetting } = appState

  const handleOnClick = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_info_bar" });
  }

  return (
    <div className={classes.root}>
      {isSetting ? <UpdateButton onClick={handleOnClick} /> : null}
      <Typography align="center" variant="h5">
        {appState.userInfo.shop_name || "SALON TABLET"}
      </Typography>
    </div>
  );
}
