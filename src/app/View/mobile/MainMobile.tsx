import React from 'react'
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';
import { usePMainProps } from '../PMain/PMain';
import { makeStyles,createStyles, Theme, Button } from '@material-ui/core';
import { useDrawerProps } from '../Drawer';

const useStyles = makeStyles((theme: Theme) => {
  // const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
    },
    button: {
      width: "100%",
    },
    item: {
      border: "1px solid black",
    },
  });
})

export const MainMobile = () => {
  const classes = useStyles()
  const {
    appState,
    articles,
    handleOnUpDate,
    handleOnDelete,
    openArticle,
  } = usePMainProps();

  const { handleOpenArticleEditor } = useDrawerProps()

  return (
    <div className={classes.root}>
      <Button color="primary" className={classes.button} onClick={() => handleOpenArticleEditor()}>新規投稿</Button>
      {articles.map((value, key) => {
        return (
          <div key={key} className={classes.item}>
            <div>{value.title}</div>
            <div>{sqlToDate(value.created_at)}</div>
            <div>
              {value.article_excerpt}
              {/* 抜粋が100文字の場合"..."追加" */}
              {value.article_excerpt.length === 100 ? "..." : ""}
            </div>
            <button onClick={() => handleOnUpDate(value.id)}>編集</button>
            <button onClick={() => handleOnDelete(value.id)}>削除</button>
          </div>
        );
      })}
    </div>
  );
}