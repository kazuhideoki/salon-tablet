import { Button, createStyles, makeStyles, Typography, Theme, TextField, Paper, useTheme, Box } from '@material-ui/core';
import React from 'react';
import { Provider } from './lib/ThemeProvider';
import "../../public/fonts/fonts.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBox: {
      display: 'flex',
    },
    color: {
      width: 300,
      height: 100,
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
    },
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
    },
    colorSpan: {
      backgroundColor: 'white',
      margin: theme.spacing(1),
    },
    root: {
      padding: theme.spacing(2)
    },
    itemBox: {
      marginBottom: theme.spacing(3),
    },
    button: {
      marginRight: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
)

const DesignBoard:React.FC = () => {
  const classes = useStyles() 

  const theme = useTheme()

  return (
    <div className={classes.root}>
      <div className={`${classes.itemBox} ${classes.colorBox}`}>
        <div className={`${classes.color} ${classes.colorPrimary}`}>
          <span className={classes.colorSpan}>
            プライマリーカラー
          </span>
        </div>
        <div className={`${classes.color} ${classes.colorSecondary}`}>
          <span className={classes.colorSpan}>
            セカンダリカラー
          </span>
        </div>
      </div>
      <div className={classes.itemBox}>
        {/* <Typography component="h2" variant='h5' gutterBottom>
          ■ボタン
        </Typography> */}
        <Button className={classes.button}>デフォルト</Button>
        <Button className={classes.button} variant='contained' color='primary'>contained</Button>
        <Button className={classes.button} variant='outlined'>outlined</Button>
      </div>
      <div className={classes.itemBox}>
        {/* <Typography component="h2" variant='h5' gutterBottom>
          ■テキストフィールド
        </Typography> */}
        <TextField/>
      </div>
      <div className={classes.itemBox}>
        {/* <Typography component="h2" variant='h5' gutterBottom>
          ■タイポグラフィ
        </Typography> */}
        <Paper className={classes.paper}>
        <Typography component="h1" variant='h4' gutterBottom>
          見出し1 Heading 1
        </Typography>
        <Typography component="h2" variant='h5' gutterBottom>
          見出し2 Heading 3
        </Typography>
        <Typography component="p" variant='body1' gutterBottom>
          本文 Paragraph
        </Typography>
        <Typography component="p" variant='subtitle1' gutterBottom>
          サブ subtitle
        </Typography>
        <Typography component="p" variant='caption' gutterBottom>
          キャプション caption
        </Typography>
        </Paper>
      </div>
      <div className={classes.itemBox}>
      </div>
    </div>
  )
}

export default {
  title: '_DesignBoard',
  component: DesignBoard,
  decorators: [story => <Provider >{story()}</Provider>],
};

export const Normal = () => {

  return (
    <DesignBoard/>
  )
}