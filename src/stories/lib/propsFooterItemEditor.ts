import { TUseFooterItemEditorProps } from "../../app/View/Drawer/ItemEditor/FooterItemEditor";

export const propsFooterItemEditor: TUseFooterItemEditorProps = {
  dispatchAppState: null,
  onTap: "modal",
  isEditting: false,
  titleText: "",
  editorText: "",
  setEditorText: null,
  setEditorTextExcerpt: null,
  // selectedIcon: [WifiTwoTone, "WifiTwoTone"],
  selectedIcon: null,
  dispatchSelectedIcon: null,
  linkUrl: null,
  setLinkUrl: null,
  appLinkUrl: null,
  setAppLinkUrl: null,
  charCountFooterItemContent: 0,
  setCharCountFooterItemContent: null,
  handleOnChangeIconName: null,
  handleSubmit: null,
  modalSize: "large",
  dataType: "default_data",
  setDataType: null,
  is_admin: false,
  isMobile: false,
};