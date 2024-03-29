import React from 'react';
import { ThemeContext } from '../../../../stores/theme/ThemeProvider';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Chip,
  Card,
} from '@material-ui/core';
import { HomeButton } from './components/HomeButton';
import { PaginationArrows } from './components/PaginationArrows';
import { TagsButton } from './components/TagsButton';
import { Instagram } from '@material-ui/icons';
import { PaginationInstagram } from './components/PaginationInstagram';
import {
  PaginationBarPresenterProps,
  usePaginationBarProps,
} from './usePaginationBarProps';

export type PaginationPresenterPropsAndClasses = PaginationBarPresenterProps & {
  classes: PaginationBarClasses;
};

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      borderRadius: 0,
      width: '100%',
    },
    gridContainer: {
      overflowX: 'scroll',
      width: '100%',
    },
    gridIcons: {
      marginLeft: 'auto',
      display: 'flex',
      wrap: 'nowrap',
    },
    isTabletPortrait: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    item: {
      padding: 4,
    },
    gridPagination: {
      marginRight: 'auto',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    icons: {
      fontSize: 'inherit',
    },

    button: {
      border: '1px solid',
    },
    selectedButton: {
      fontWeight: 'bold',
      color: theme.palette.secondary.main,
    },
    disabled: {
      color: theme.palette.text.disabled,
      border: 'none',
    },
    girdSelectedTags: {
      overflowX: 'scroll',
      overflowY: 'hidden',
      flexShrink: 1,
    },
    selectedTags: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      width: 'fit-content',
      height: '100%',
    },

    instagramAccount: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
    },
  });
});

export type PaginationBarClasses = ReturnType<typeof useStyles>;

export const PaginationBarPresenter: React.FC<PaginationBarPresenterProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${props.className}`}>
      <Grid
        container
        spacing={1}
        wrap="nowrap"
        direction={props.isTabletPortrait ? 'column' : undefined}
        className={`${classes.gridContainer}`}>
        <Grid
          item
          className={`${classes.gridIcons} ${
            props.isTabletPortrait ? classes.isTabletPortrait : ''
          }`}>
          <div className={classes.item}>
            <props.StyledIconButton
              className={` ${classes.button} ${
                props.isShowInstagram === false &&
                props.selectedTagNames.length === 0
              }`}
              onClick={() => props.getArticles(props.isSetting, 1, [])}>
              <HomeButton />
            </props.StyledIconButton>
          </div>

          {props.tags.length ? (
            <div className={classes.item}>
              <props.StyledIconButton
                className={
                  props.isShowInstagram === false &&
                  props.selectedTagNames.length
                    ? `${classes.button} ${classes.selectedButton}`
                    : classes.button
                }
                onClick={() => props.openModal('select_tags')}>
                <TagsButton />
              </props.StyledIconButton>
            </div>
          ) : null}

          {props.isShowInstagram === false &&
            props.selectedArticlesTags.length !== 0 && (
              <div className={classes.item}>
                <div
                  id="pagination_selected_tags_div"
                  className={`${classes.selectedTags}`}>
                  {props.selectedTagNames.map((value, index) => (
                    <Chip key={index} label={value} size="small" />
                  ))}
                </div>
              </div>
            )}

          {props.instagramAccounts.length ? (
            <div className={classes.item}>
              <props.StyledIconButton
                className={
                  props.isShowInstagram
                    ? `${classes.button} ${classes.selectedButton}`
                    : classes.button
                }
                onClick={() => props.openModal('select_instagram')}>
                <Instagram />
              </props.StyledIconButton>
            </div>
          ) : null}

          {props.isShowInstagram && (
            <div className={`${classes.item} ${classes.instagramAccount}`}>
              <Chip
                label={props.selectedInstagramAccount.username}
                size="small"
              />
            </div>
          )}
        </Grid>

        <Grid
          item
          className={`${classes.gridPagination} ${
            props.isTabletPortrait ? classes.isTabletPortrait : ''
          }`}>
          {props.isShowInstagram ? (
            <PaginationInstagram {...props} classes={classes} />
          ) : (
            <PaginationArrows {...props} classes={classes} />
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export const PaginationBar = ({ className = '' }) => {
  const props = usePaginationBarProps();

  return <PaginationBarPresenter {...props} className={className} />;
};
