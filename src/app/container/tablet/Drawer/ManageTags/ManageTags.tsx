import React from 'react';
import {
  TextField,
  Button,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';
import { CharCounter } from '../../../../components/CharCounter';
import { Skeleton } from '@material-ui/lab';
import {
  ManageTagsPresenterProps,
  useManageTagsProps,
} from './useManageTagsProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // margin: theme.spacing(2)
    },
    header: {
      margin: theme.spacing(2),
    },
    edittingInfo: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    textFieldAndButton: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    textField: {
      marginLeft: theme.spacing(2),
    },
    button: {
      margin: `0 ${theme.spacing(2)}px`,
    },
    tagsWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: `0 ${theme.spacing(2)}px`,
    },
    tag: {
      margin: theme.spacing(1),
    },
    skeleton: {
      width: 80,
      height: 32,
      borderRadius: 16,
    },
  })
);

export const ManageTagsPresenter: React.FC<ManageTagsPresenterProps> = (
  props
) => {
  const classes = useStyles();

  const displayTags = props.tags.map((value, index) => {
    if (props.loading) {
      return (
        <Skeleton
          variant="rect"
          className={`${classes.tag} ${classes.skeleton}`}
        />
      );
    }

    return (
      <Chip
        key={index}
        className={classes.tag}
        label={value.tag_name}
        color={value.tag_id === props.edittingTagId ? 'primary' : undefined}
        onClick={
          props.isEditting && value.tag_id === props.edittingTagId // 編集中にもう一度タップすると新規作成に戻る
            ? () => props.handleOnCreateNew()
            : () => props.handleOnEditting(value.tag_id, value.tag_name)
        }
        onDelete={() => props.deleteTag(value.tag_id)}
      />
    );
  });
  const noTags = (
    <Typography variant="subtitle1">タグが作成されていません</Typography>
  );

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        タグ管理
      </Typography>
      <Typography variant="h5" component="p" className={classes.edittingInfo}>
        {props.isEditting
          ? `タグ"${props.edittingTagName}"を編集中`
          : '新規作成'}
      </Typography>
      <div className={classes.textFieldAndButton}>
        <TextField
          name="createTag"
          label="タグ名"
          id="create_tag"
          value={props.tagNameField}
          onChange={(e) => props.setTagNameField(e.target.value)}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault();
              props.handleOnClick();
            }
          }}
          className={classes.textField}
        />

        <CharCounter charCount={props.tagNameField.length} limitCount={20} />

        <Button
          onClick={() => props.handleOnClick()}
          disabled={!props.isValidTagName()}
          className={classes.button}>
          {props.isEditting ? '更新' : '作成'}
        </Button>
      </div>

      <div className={classes.tagsWrap}>
        {props.tags.length ? displayTags : noTags}
      </div>
    </div>
  );
};

export const ManageTags = () => {
  const props = useManageTagsProps();

  return <ManageTagsPresenter {...props} />;
};
