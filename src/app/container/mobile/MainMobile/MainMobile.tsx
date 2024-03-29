import React from 'react';
import { sqlToDate } from '../../../../util/sqlToDate';
import {
  makeStyles,
  createStyles,
  Theme,
  CircularProgress,
  Typography,
  CardActionArea,
  Chip,
} from '@material-ui/core';
import { EditButtonsBox } from '../../../components/editButtonBox/EditButtonsBox';
import { showDataType } from '../../tablet/Main/components/showDataType';
import {
  MainMobilePresenterProps,
  useMainMobileProps,
} from './useMainMobileProps';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      overflowY: 'scroll',
      flexGrow: 1,
      width: '100%',
    },
    items: {
      overflowY: 'scroll',
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      borderBottom: '1px solid grey',
      padding: theme.spacing(1),

      position: 'relative',
    },
    thumbnailDiv: {
      margin: theme.spacing(1),
    },
    thumbnail: {
      objectFit: 'cover',
      width: '130px',
      height: '130px',
    },
    contents: {
      margin: theme.spacing(1),
    },
    itemIsDraft: {
      border: '2px solid red',
      borderRadius: 2,
      fontStyle: 'italic',
    },
    circularProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    editButtonsBox: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  });
});

export const MainMobilePresenter: React.FC<MainMobilePresenterProps> = (
  props
) => {
  const classes = useStyles();

  if (props.loading) {
    return (
      <CircularProgress
        className={classes.circularProgress}
        size={50}
        thickness={4}
      />
    );
  }

  if (props.articles.length === 0) {
    return <div className={classes.item}>記事がありません</div>;
  }

  return (
    <div className={`${classes.root} ${props.className}`}>
      {props.articles.map((value, index) => {
        return (
          <div key={index} className={classes.items}>
            <CardActionArea
              className={classes.item}
              onClick={() => props.openArticleModal(index)}
              component="div">
              <div className={classes.thumbnailDiv}>
                {value.article_img.length ? (
                  <img
                    className={`p-main-thumbnail ${classes.thumbnail}`}
                    src={value.article_img}
                  />
                ) : (
                  <div
                    className={`p-main-thumbnail ${classes.thumbnail}`}></div>
                )}
              </div>
              <div className={classes.contents}>
                <Typography variant="h6" component="h2">
                  {value.title}
                  {value.is_published ? null : (
                    <Chip
                      size="small"
                      label="下書き"
                      className={classes.itemIsDraft}
                    />
                  )}
                  {showDataType(value.data_type)}
                </Typography>
                <Typography gutterBottom variant="subtitle1" align="right">
                  {sqlToDate(value.created_at)}
                </Typography>
              </div>
            </CardActionArea>
            {props.isSetting ? (
              <EditButtonsBox
                className={classes.editButtonsBox}
                // update
                handleUpdateButton={{
                  onClick: () => props.onClickUpdate(value),
                }}
                handleDeleteButton={{
                  onClick: () => props.deleteArticle(value.article_id),
                }}
              />
            ) : null}
          </div>
        );
      })}
      {/* </List> */}
    </div>
  );
};

export const MainMobile = ({ className = '' }) => {
  const props = useMainMobileProps();

  return <MainMobilePresenter {...props} className={className} />;
};
