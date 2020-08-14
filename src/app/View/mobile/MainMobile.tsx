import React from 'react'
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';
import { usePMainProps } from '../Main/PMain';
import { makeStyles,createStyles, Theme, Button, CircularProgress } from '@material-ui/core';
import { useDrawerProps } from '../Drawer/Drawer';
import { Store } from '../../Store/Store';
import { PaginationMobile } from './PaginationMobile';
import { useDeleteArticle } from '../../ActionCreator/articles/useDeleteArticle';

export const useMainMobileProps = () => {
  const {
    articles,
    dispatchAppState
  } = usePMainProps();

  const { appState } = React.useContext(Store)
  const {loading} = appState

  const deleteAritlce = useDeleteArticle()

  return {
    articles,
    dispatchAppState,
    loading,
    deleteAritlce,
  };
}

type Props = ReturnType<typeof useMainMobileProps>

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
    items: {
      overflowY: "scroll",
    },
    item: {
      border: "1px solid black",
    },
    itemIsDraft: {
      border: "1px solid red",
      borderRadius: 2,
      fontStyle: "italic",
    },
    circularProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  });
})

export const MainMobilePresenter:React.FC<Props> = (props) => {
  const classes = useStyles()

  if (props.loading.main) {
    return <CircularProgress
      className={classes.circularProgress}
      size={50}
      thickness={4}
    />
  }
      
  return (
    <div className={classes.root}>
      
      <div className={classes.items}>
      {props.articles.length === 0
      ? <div className={classes.item}>記事がありません</div>

      : props.articles.map((value, key) => {
        return (
          <>
          <div key={key} className={classes.item}>
            <div>
              タイトル:{value.title}
              {value.is_published || (
                <span className={classes.itemIsDraft}>下書き</span>
              )}
            </div>
            <div>作成日:{sqlToDate(value.created_at)}</div>
            {value.updated_at ? (
              <div>編集日:{sqlToDate(value.updated_at)}</div>
            ) : null}
            <div>
              {value.article_excerpt}
              {/* 抜粋が100文字の場合"..."追加" */}
              {value.article_excerpt.length === 100 ? "..." : ""}
            </div>
            <button onClick={() => props.dispatchAppState({type: "OPEN_ARTICLE_EDITOR_FOR_EDIT", payload: value})}>
              編集
            </button>
            <button onClick={() => props.deleteAritlce(value.article_id)}>
              削除
            </button>
          </div>
          </>
        );
      })}
      </div>
       
    </div>
  );
}

export const MainMobile = () => {
  const props = useMainMobileProps()

  return <MainMobilePresenter {...props}/>
}
