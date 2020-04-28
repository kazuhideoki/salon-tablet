import React from 'react'
import { PostDataSingle, FooterItem } from './Store';

type ContextProps = {
  titleText: string
  setTitleText: React.Dispatch<React.SetStateAction<string>>
  editorText: string
  setEditorText: React.Dispatch<React.SetStateAction<string>>
  isEdittingPost: boolean,
  setIsEdittingPost: React.Dispatch<React.SetStateAction<boolean>>
  edittingPostParams:PostDataSingle
  setEdittingPostParams: React.Dispatch<React.SetStateAction<PostDataSingle>>

  iconName: string
  setIconName: React.Dispatch<React.SetStateAction<string>>
  footerItemEditorText: string
  setFooterItemEditorText: React.Dispatch<React.SetStateAction<string>>
  isEdittingFooterItem: boolean
  setIsEdittingFooterItem: React.Dispatch<React.SetStateAction<boolean>>
  edittingFooterItemParams: FooterItem
  setEdittingFooterItemParams: React.Dispatch<React.SetStateAction<FooterItem>>
}

const EditorContext = React.createContext({} as ContextProps);

// Storeに一緒にするとeditorTextが更新されたときにいちいちmodalが出現してしまうので別のcontextにした
const EditorContextProvider = (props) => {
  const [titleText, setTitleText] = React.useState("")
  const [editorText, setEditorText] = React.useState("");
  const [isEdittingPost, setIsEdittingPost] = React.useState(false)
  const [edittingPostParams, setEdittingPostParams] = React.useState({} as PostDataSingle);

  const [iconName, setIconName] = React.useState("")
  const [footerItemEditorText, setFooterItemEditorText] = React.useState("");
  const [isEdittingFooterItem, setIsEdittingFooterItem] = React.useState(false)
  const [edittingFooterItemParams, setEdittingFooterItemParams] = React.useState({} as FooterItem);

  const values = {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    isEdittingPost,
    setIsEdittingPost,
    edittingPostParams,
    setEdittingPostParams,

    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    isEdittingFooterItem,
    setIsEdittingFooterItem,
    edittingFooterItemParams,
    setEdittingFooterItemParams,
  };

  return (
      <EditorContext.Provider value={values}>
          {props.children}
      </EditorContext.Provider>
  )
}

export { EditorContext, EditorContextProvider };
export default EditorContextProvider
