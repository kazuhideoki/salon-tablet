import { Font1, Font2 } from '../../app/stores/theme/lib/fonts';

export type ShowArticleType = 'scroll' | 'grid6';
export type SelectedTheme = 'default' | 'white' | 'natural';
export type ThemeFont = Font1[0] | Font2[0];
export type FooterIconSize = 'medium' | 'small';

export type UserInfoFromDB = {
  user_id: number;
  user_name: string;
  shop_name: string;
  user_email: string;
  created_at: string;
  updated_at: string | null;
  selected_theme: SelectedTheme;
  is_admin: boolean | number;
  is_generate_public_page: boolean | number;
  public_page_slug: string;
  show_article_type: ShowArticleType;
  theme_color: string;
  theme_font1: ThemeFont;
  theme_font2: ThemeFont;
  footer_icon_size: FooterIconSize;
  theme_font_heading: ThemeFont;
};

export type UserInfo = Omit<
  UserInfoFromDB,
  'is_admin' | 'is_generate_public_page'
> & {
  is_admin: boolean;
  is_generate_public_page: boolean;
};

const initPagination = {
  page: 0,
  pageCount: 0,
  pageSize: 0,
  rowCount: 0,
};
export type PaginationParams = typeof initPagination;

export type DataTypeFooterItem = 'default_data' | 'sample_data';
export type DataTypeArticle = DataTypeFooterItem | 'web_article';

// ●●●●●● テーブル `articles`

export type ArticleFromDB = {
  article_id: number;
  user_id: number;
  tag_ids: string | number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  article_content: string;
  article_excerpt: string;
  article_img: string;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  data_type: DataTypeArticle;
};
export type Article = Omit<ArticleFromDB, 'tag_ids'> & {
  tag_ids: number[];
};
export type ArticleWithoutId = Omit<Article, 'article_id'>;

export type AllArticles = {
  article_id: number;
  title: string;
}[];

// ●●●●●● テーブル `footer_items`
export type Ontap = 'modal' | 'link' | 'appLink' | 'google';
export type ModalSize =
  | 'fullScreen'
  | 'large'
  | 'medium'
  | 'small'
  | 'upperSide';

type is_published = boolean | number;
export type FooterItemFromDB = {
  footer_item_id: number;
  user_id: number;
  is_published: is_published;
  created_at: string;
  updated_at: string | null;
  icon_name: string;
  displayed_icon_name: string;
  on_tap: Ontap;
  item_content: string;
  item_excerpt: string;
  link_url: string;
  app_link_url: string;
  modal_size: ModalSize;
  order: number;
  order_sidebar: number;
  // 初回サインイン時のサンプルデータのコピー元をtrueに
  data_type: DataTypeFooterItem;
};

export type FooterItem = Omit<FooterItemFromDB, 'is_published'> & {
  is_published: Exclude<is_published, number>;
};

export type FooterItemWithoutId = Omit<FooterItem, 'footer_item_id'>;
export type FooterItems = FooterItem[];

// ●●●●●● テーブル `info_bar`

export type InfoBarType = 'shop_name' | 'scrolling_sentence' | 'article';

export type InfoBarWithoutId = {
  user_id: number;
  info_bar_type: InfoBarType;
  scrolling_sentence: string;
  scrolling_animation_duration: number;
  selected_article_id: number | null;
};

export type InfoBar = InfoBarWithoutId & { info_bar_id: number };
export type InfoBarData = {
  infoBar: InfoBar;
  targetArticle: Article;
};

// ●●●●●● テーブル `tags`

export type Tag = {
  tag_id: number;
  user_id: number;
  tag_name: string;
  created_at: string;
  updated_at: string | null;
};

export type Tags = Tag[];

// ●●●●●● テーブル `instagram_accounts`

type is_reconnect_needed = boolean | number;
export type InstagramAccountFromDB = {
  instagram_id: number;
  username: string;
  profile_img: string;
  access_token?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_reconnect_needed: is_reconnect_needed;
};
export type InstagramAccount = Omit<
  InstagramAccountFromDB,
  'access_token' | 'is_reconnect_needed'
> & { is_reconnect_needed: Exclude<is_reconnect_needed, number> };

export type InstagramAccounts = InstagramAccount[];

export type MediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export type InstagramMedia = {
  id: number;
  caption: string;
  media_type: MediaType;
  media_url: string;
  permalink: string;
  thumbnail_url: string;
  timestamp: string;
  username: string;
};
export type InstagramMedias = InstagramMedia[];

export const initInstagramMediaObject = {
  data: [] as InstagramMedia[],
  paging: {
    cursors: {
      before: '',
      after: '',
    },
    next: '',
    previous: '',
  },
} as InstagramMediaObject;

export type InstagramMediaObject = {
  data: InstagramMedia[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
};

export type SetModal =
  | 'content_modal'
  | 'footer_item_modal'
  | 'google_search'
  | 'instagram_media_modal'
  | 'select_tags'
  | 'select_instagram'
  | 'edit_info_bar'
  | 'edit_article'
  | 'edit_footer_item'
  | 'edit_tags'
  | 'manage_instagram'
  | 'setting_theme'
  | 'setting_user_info'
  | 'feedback_form'
  | 'delete_account_form'
  | 'popup_not_email_verified';

export type SelectedDevice = 'responsive' | 'mobile' | 'tablet';

export type UaDeviceType =
  | 'console'
  | 'mobile'
  | 'tablet'
  | 'smarttv'
  | 'wearable'
  | 'embedded'
  | 'unknown';
