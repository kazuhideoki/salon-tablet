import React, { useReducer } from "react";
import { ArticlesAction, articlesReducer } from "../Reducer/articlesRducer";
import { FooterItemsAction, footerItemsReducer } from "../Reducer/footerItemsReducer";
import { AppStateAction, appStateReducer } from "../Reducer/appStateReducer";
import {
  PaginationParamsAction,
  paginationParamsReducer,
} from "../Reducer/paginationParamsReducer";
import { loadingReducer, LoadingAction } from "../Reducer/loadingReducer";
import { userInfoReducer, TUserInfoAction } from "../Reducer/userInfoReducer";
import { tagsReducer, TagsAction } from "../Reducer/tagsReducer";
import { IndexProps } from "../../pages";
import {
  instagramAccountsReducer,
  InstagramAccountsAction,
} from "../Reducer/instagramAccountsReducer";


export type T_user_id = number
export type T_user_name = string
export type T_shop_name = string
export type T_user_email = string;
export type T_selected_theme = string
export type T_created_at_user = string
export type T_updated_at_user = string

export type TUserInfo = {
  user_id: T_user_id;
  user_name: T_user_name | null;
  shop_name: T_shop_name | null;
  user_email: T_user_email;
  selected_theme: T_selected_theme
  is_first_sign_in: boolean;
  bcrypt_password?: string
  created_at: T_created_at_user;
  updated_at: T_updated_at_user | null;
  isSetPassword: boolean;
};

const initPagination = {
  page: 0,
  pageCount: 0,
  pageSize: 0,
  rowCount: 0,
};
export type PaginationParams = typeof initPagination;
export type T_is_sample = boolean
// ●●●●●● テーブル `articles`
export type T_article_id = number;
// ※tag_idsはDBから取り出した直後、値がない場合はnullのこともある （tagIdsParseの前）
export type T_tag_ids = number[]
export type T_is_published_articles = boolean
export type T_created_at = string 
export type T_updated_at = string
export type T_title = string 
export type T_article_content = string 
export type T_article_excerpt = string 
export type T_article_img = string 

export type ArticleWithoutArticleId = {
  user_id: T_user_id;
  tag_ids: T_tag_ids
  is_published: T_is_published_articles;
  created_at: T_created_at;
  updated_at: T_updated_at;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  is_sample_data: T_is_sample;
};
export type TArticle = { article_id: T_article_id } & ArticleWithoutArticleId;
export type TArticles = TArticle[]

// ●●●●●● テーブル `footer_items`
export type T_footer_item_id = number;
export type T_is_published_footer_items = boolean;
export type T_created_at_footer_items = string;
export type T_updated_at_footer_items = string | null;
export type T_icon_name = string | null
export type T_displayed_icon_name = string | null;
export type T_on_tap = string;
export type T_item_content = string | null
export type T_item_excerpt = string | null;
export type T_link_url = string | null
export type T_app_link_url = string | null;
export type T_modal_size = 'fullScreen' | 'large' | 'medium' | 'small'
export type T_order = number;

export type FooterItemWithoutId = {
  user_id: T_user_id;
  is_published: T_is_published_footer_items;
  created_at: T_created_at_footer_items;
  updated_at: T_updated_at_footer_items | null;
  icon_name: T_icon_name | null;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content | null;
  item_excerpt: T_item_excerpt | null;
  link_url: T_link_url | null;
  app_link_url: T_app_link_url | null;
  modal_size: T_modal_size
  order: T_order;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  is_sample_data: T_is_sample;
};
export type FooterItem = {
  footer_item_id: T_footer_item_id;
} & FooterItemWithoutId;
export type FooterItems = FooterItem[]

// ●●●●●● テーブル `tags`

export type T_tag_id = number
export type T_tag_name = string
export type T_created_at_tag = string
export type T_updated_at_tag = string | null

export type TTag = {
  tag_id: T_tag_id,
  user_id: T_user_id
  tag_name: T_tag_name
  created_at: T_created_at_tag
  updated_at: T_updated_at_tag
}

export type TTags = TTag[]

export type T_instagram_id = number
export type T_instagram_username = string
export type T_profile_img = string
export type T_expires = string
export type T_created_at_instagram_account = string
export type T_updated_at_instagram_account = string

export type TInstagramAccount = {
  instagram_id: T_instagram_id;
  username: T_instagram_username;
  profile_img: T_profile_img;
  expires: T_expires;
  user_id: T_user_id;
  created_at: T_created_at_instagram_account;
  updated_at: T_updated_at_instagram_account;
};
export type TInstagramAccounts = TInstagramAccount[]

const initAppState = {
  isSetting: true,
  setModal: "edit_article",
  isDrawerOpen: true,
  currentModalContent: {
    title: "",
    contnet: "",
    modalSize: 'large' as T_modal_size,
  },

  edittingPrams: {
    isEditting: false,
    article: {} as TArticle,
    footerItem: {} as FooterItem,
    modalSize: 'large' as T_modal_size,
  },
  selectedArticlesTags: [] as number[],
  isModalOpen: false,
  isArticleModalOpen: false,
};

export type AppState = typeof initAppState

const initLoading = {
  mainArticles: false,
  modalEditor: false
}
export type Loading = typeof initLoading



export type ContextProps = {
  userInfo: TUserInfo;
  dispatchUserInfo: React.Dispatch<TUserInfoAction>;
  paginationParams: PaginationParams;
  dispatchPaginationParams: React.Dispatch<PaginationParamsAction>;
  articles: TArticles;
  dispatchArticles: React.Dispatch<ArticlesAction>;
  footerItems: FooterItems;
  dispatchFooterItems: React.Dispatch<FooterItemsAction>;
  tags: TTags;
  dispatchTags: React.Dispatch<TagsAction>;
  instagramAccounts: TInstagramAccounts;
  dispatchInstagramAccounts: React.Dispatch<InstagramAccountsAction>
  appState: AppState;
  dispatchAppState: React.Dispatch<AppStateAction>;
  loading: Loading;
  dispatchLoading: React.Dispatch<LoadingAction>;
};
const Store = React.createContext({} as ContextProps);

const StoreContextProvider: React.FC<IndexProps> = (props) => {
  const [userInfo, dispatchUserInfo] = useReducer(
    userInfoReducer,
    props.data.session
  );
  const [paginationParams, dispatchPaginationParams] = useReducer(
    paginationParamsReducer,
    props.data.pagination
  );
  const [articles, dispatchArticles] = useReducer(
    articlesReducer,
    props.data.articles
  );
  const [footerItems, dispatchFooterItems] = useReducer(
    footerItemsReducer,
    props.data.footerItems
  );
  const [tags, dispatchTags] = useReducer(tagsReducer, props.data.tags)

  const [instagramAccounts, dispatchInstagramAccounts] = useReducer(
    instagramAccountsReducer,
    props.data.instagramAccounts
  );

  const [appState, dispatchAppState] = useReducer(
    appStateReducer,
    initAppState
  );
  const [loading, dispatchLoading] = useReducer(loadingReducer, initLoading);

  const values = {
    userInfo,
    dispatchUserInfo,
    paginationParams,
    dispatchPaginationParams,
    articles,
    dispatchArticles,
    footerItems,
    dispatchFooterItems,
    tags,
    dispatchTags,
    instagramAccounts,
    dispatchInstagramAccounts,
    appState,
    dispatchAppState,
    loading,
    dispatchLoading,
  };

  return <Store.Provider value={values}>{props.children}</Store.Provider>;
};

export { Store, StoreContextProvider };

export default StoreContextProvider;