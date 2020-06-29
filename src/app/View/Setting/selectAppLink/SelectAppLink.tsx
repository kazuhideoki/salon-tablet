import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { EditorContext } from '../../../Store/EditorContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const SelectAppLink = ({appLinkUrl, setAppLinkUrl}) => {
  const classes = useStyles()

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="select-app-label">アプリ</InputLabel>
      <Select
        labelId="select-app-label"
        id="select-app"
        value={appLinkUrl}
        onChange={(e: React.ChangeEvent<{ value: string }>) =>
          setAppLinkUrl(e.target.value)
        }
        label="アプリ"
      >
        {/* <AppLinks/> */}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {/* ※↓mapを使ってやろうとしたがうまく行かなかった。別ファイルにも分けられない？ */}
        <MenuItem value="rmagazine://">楽天マガジン(iOS, Android)</MenuItem>
        <MenuItem value="fb179689808731959://">Magzter(iOS)</MenuItem>
        <MenuItem value="magzter://">Magzter(Android)</MenuItem>
        <MenuItem value="ibooks://">iBooks(iOS)</MenuItem>
        <MenuItem value="photos-redirect://">Photos(iOS)</MenuItem>
      </Select>
    </FormControl>
  );
}
