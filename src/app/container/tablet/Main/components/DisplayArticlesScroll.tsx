import React from 'react';
import {
  Grid,
  CardActionArea,
  Card,
  Button,
  Typography,
} from '@material-ui/core';
import { EditButtonsBox } from '../../../../components/editButtonBox/EditButtonsBox';
import { MainPresenterProps } from '../useMainProps';
import { showDataType } from './showDataType';
import { Skeleton } from '@material-ui/lab';
import { sqlToDate } from '../../../../../util/sqlToDate';
import { SelectedTags } from './SelectedTags';
import { MainClasses } from '../Main';

export type DisplayProps = {
  props: MainPresenterProps;
  classes: MainClasses;
  StyledCardContent: any;
};

export const DisplayArticlesScroll: React.FC<DisplayProps> = ({
  props,
  classes,
  StyledCardContent,
}) => {
  return (
    <>
      {props.articles.map((value, index) => {
        return (
          <Grid
            item
            key={index}
            // 投稿済みか下書きかで見た目を変える
            className={`${classes.gridItem}
            ${!value.is_published ? classes.itemIsDraft : ''}
          `}>
            {props.isSetting ? (
              <EditButtonsBox
                className={classes.editButtonsBox}
                handleUpdateButton={{
                  onClick: () => props.onClickUpdate(value),
                }}
                handleDeleteButton={{
                  onClick: () => props.deleteArticle(value.article_id),
                }}
              />
            ) : null}
            <CardActionArea
              className={classes.cardActionArea}
              onClick={() => props.openArticleModal(index)}
              component="div">
              <Card className={classes.card}>
                <StyledCardContent className={classes.cardContent}>
                  {showDataType(value.data_type, classes.showDataType)}

                  <div className={classes.thumbnailDiv}>
                    {props.loading ? (
                      <Skeleton
                        variant="rect"
                        className={classes.thumbnail}
                        style={{ marginBottom: '32px' }}
                      />
                    ) : value.article_img.length ? (
                      <img
                        className={`p-main-thumbnail ${classes.thumbnail}`}
                        src={value.article_img}
                      />
                    ) : (
                      <div
                        className={`p-main-thumbnail ${classes.thumbnail}`}></div>
                    )}
                    {props.loading ? null : (
                      <Typography
                        variant="h5"
                        component="h2"
                        className={classes.title}>
                        {props.loading ? null : <>{value.title}</>}
                      </Typography>
                    )}
                  </div>

                  {props.loading ? null : (
                    <div className={classes.tagsAndDate}>
                      <SelectedTags
                        className={classes.tags}
                        article={value}
                        tags={props.tags}
                      />
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        align="right"
                        // className={}
                      >
                        {sqlToDate(value.created_at)}
                      </Typography>
                    </div>
                  )}

                  <div className={`p-main-article-excerpt ${classes.excerpt}`}>
                    <Typography gutterBottom variant="body1">
                      {props.loading ? (
                        <>
                          <Skeleton width="80%" style={{ margin: 'auto' }} />
                          <Skeleton width="80%" style={{ margin: 'auto' }} />
                          <Skeleton width="80%" style={{ margin: 'auto' }} />
                        </>
                      ) : (
                        <>
                          {value.article_excerpt}
                          {value.article_excerpt.length > 100 ? '...' : ''}
                        </>
                      )}
                    </Typography>
                  </div>
                </StyledCardContent>

                {props.loading ? null : (
                  <Button
                    // エラーが出る、表示がバグる原因かもしれないのでcomponent指定してみた。
                    component="div"
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.readMore}>
                    Read More
                  </Button>
                )}
              </Card>
            </CardActionArea>
          </Grid>
        );
      })}
    </>
  );
};
