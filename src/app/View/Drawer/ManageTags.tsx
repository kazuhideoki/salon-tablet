import React from 'react'
import { AllTags } from '../Main/AllTags'
import {
  TextField,
  Button,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";
import { useCreateTag } from '../../ActionCreator/tags/useCreateTag'
import { useUpdateTag } from '../../ActionCreator/tags/useUpdateTag'
import { Store } from '../../Store/Store'
import { useDeleteTag } from '../../ActionCreator/tags/useDeleteTag'
import { CharCounter } from "../viewComponents/CharCounter";
import { ModalContext } from '../Modal/ModalContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2)
    },
  })
)

export const ManageTags = () => {
  const classes = useStyles()
  const {tags} = React.useContext(Store)
  const { setSkipTransiton } = React.useContext(ModalContext) 
  const [tagNameField, setTagNameField] = React.useState('')
  const [isEditting, setIsEditting] = React.useState(false)
  const [edittingTagId, setEditingTagId] = React.useState(0)
  const [edittingTagName, setEditingTagName] = React.useState('')
  const createTag = useCreateTag()
  const updateTag = useUpdateTag()
  const deleteTag = useDeleteTag();

  const handleOnEditting = (TagId: number, tagName: string) => {
    setIsEditting(true)
    setEditingTagId(TagId)
    setTagNameField(tagName)
    setEditingTagName(tagName)
  }

  const handleOnCreateNew = () => {
    setIsEditting(false)
    setEditingTagId(null);
    setTagNameField('')
  }

  const handleOnClick = () => {
    console.log("ManageTagsのhandleOnClickだよ");
    if (isEditting) {
      updateTag({edittingTagId, tagName: tagNameField})
    } else {
      setSkipTransiton(false)
      createTag(tagNameField)
    }
  }

  const handleDelete = (tag_id) => {
    const deleting = confirm("本当に削除してよろしいですか？");
    deleting ? deleteTag(tag_id) : null;
  };

  const isValidTagName = () => {
    if (tagNameField.length === 0) {
      return false
    } else if ( tagNameField.length > 20) {
      return false
    }
    const tagNames = tags.map((value) => {
      return value.tag_name
    })

    if (tagNames.includes(tagNameField)) {
      return false
    }

    return true

  }

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        タグ管理
      </Typography>
      <p>
        {isEditting ? `タグ"${edittingTagName}"を編集中` :  "新規作成" }
      </p>
      <TextField
        name="createTag"
        label="タグ名"
        id="create_tag"
        value={tagNameField}
        onChange={(e) => setTagNameField(e.target.value)}
        onKeyPress={e => {
          if (e.key == 'Enter') {
            e.preventDefault()
            handleOnClick()
          }
        }}
      />

      <CharCounter charCount={tagNameField.length} limitCount={20} />

      <Button onClick={() => handleOnClick()} disabled={!isValidTagName()}>
        {isEditting ? "更新" : "作成"}
      </Button>
      <div>
        {tags.map((value, key) => {
          return (
            <Chip
              key={key}
              label={value.tag_name}
              color={value.tag_id === edittingTagId ? "primary" : undefined}
              onClick={
                isEditting && value.tag_id === edittingTagId // 編集中にもう一度タップすると新規作成に戻る
                  ? () => handleOnCreateNew()
                  : () => handleOnEditting(value.tag_id, value.tag_name)
              }
              onDelete={() => handleDelete(value.tag_id)}
            />
          );
        })}
      </div>
    </div>
  );
}