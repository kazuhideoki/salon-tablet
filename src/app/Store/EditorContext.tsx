import React from 'react'
import { TArticle, FooterItem } from './Store';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
// import { Settings } from '@material-ui/icons';

type ContextProps = {
  titleText: string
  setTitleText: React.Dispatch<React.SetStateAction<string>>
  editorText: string
  setEditorText: React.Dispatch<React.SetStateAction<string>>
  editorTextExcerpt: string
  setEditorTextExcerpt: React.Dispatch<React.SetStateAction<string>>
  isEdittingArticle: boolean,
  setIsEdittingArticle: React.Dispatch<React.SetStateAction<boolean>>
  edittingArticleParams: TArticle
  setEdittingArticleParams: React.Dispatch<React.SetStateAction<TArticle>>

  selectedIcon: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string] | null
  dispatchSelectedIcon: React.Dispatch<any>
  iconName: string
  setIconName: React.Dispatch<React.SetStateAction<string>>
  footerItemEditorText: string
  setFooterItemEditorText: React.Dispatch<React.SetStateAction<string>>
  onTap: string
  setOnTap: React.Dispatch<React.SetStateAction<string>>
  linkUrl: string,
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>,
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
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState("");
  const [isEdittingArticle, setIsEdittingArticle] = React.useState(false)
  const [edittingArticleParams, setEdittingArticleParams] = React.useState(
    {} as TArticle
  );


  const selectedIconReducer = (
    state: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string] | null,
    action: {
      type: "SET_ICON";
      payload: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string];
    }
  ) => {
    switch (action.type) {
      case "SET_ICON":
        return action.payload;
      // break;

      default:
        return state;
    }
  };
  // reducerにすることで複雑なオブジェクトを格納できる
  const [selectedIcon, dispatchSelectedIcon] = React.useReducer(
    selectedIconReducer,
    null
  );
  const [iconName, setIconName] = React.useState("")
  const [footerItemEditorText, setFooterItemEditorText] = React.useState("");
  const [onTap, setOnTap] = React.useState('modal')
  const [linkUrl, setLinkUrl] = React.useState('')
  const [isEdittingFooterItem, setIsEdittingFooterItem] = React.useState(false)
  const [edittingFooterItemParams, setEdittingFooterItemParams] = React.useState({} as FooterItem);

  const values = {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    editorTextExcerpt,
    setEditorTextExcerpt,
    isEdittingArticle,
    setIsEdittingArticle,
    edittingArticleParams,
    setEdittingArticleParams,

    selectedIcon,
    dispatchSelectedIcon,
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    onTap,
    setOnTap,
    linkUrl,
    setLinkUrl,
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
