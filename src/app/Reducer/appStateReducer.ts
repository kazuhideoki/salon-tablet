import {
  TAppState,
} from "../Store/Types";
import { reducerLogger } from "./reducerLogger";
import { AppStateAction } from "./AppStateAction";

export function appStateReducer(state: TAppState, action: AppStateAction) {
    let newState: TAppState;
    const func = appStateReducer
    switch (action.type) {
      case "OPEN_MODAL":
        newState = {
          ...state,
          setModal: action.payload,
          isModalOpen: true,
        };
        break;
      case "CLOSE_MODAL":
        newState = {
          ...state,
          isModalOpen: false,
        };
        break;

      case "OPEN_DRAWER":
        newState = {
          ...state,
          isDrawerOpen: true,
          isModalOpen: false,
        };
        break;

      case "CLOSE_DRAWER":
        newState = {
          ...state,
          isDrawerOpen: false,
        };
        break;
      case "ON_IS_LOADING_MAIN":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            mainArticles: true,
          },
        };
        break;
      case "OFF_IS_LOADING_MAIN":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            mainArticles: false,
          },
        };
        break;

      case "OPEN_ARTICLE_MODAL":
        newState = {
          ...state,
          setModal: "content_modal",
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            article: state.articles[action.payload],
            modalSize: "large",
          },
        };
        break;
      case "OPEN_FOOTER_ITEM_MODAL":
        newState = {
          ...state,
          setModal: "footer_item_modal",
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            footerItem: state.footerItems[action.payload],
            modalSize: state.footerItems[action.payload].modal_size,
          },
        };
        break;
      case "OPEN_INSTAGRAM_MEDIA_MODAL":
        newState = {
          ...state,
          setModal: "instagram_media_modal",
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            instagramMedia: state.instagramMedias[action.payload],
            modalSize: "medium",
          },
        };
        break;

      case "OPEN_ARTICLE_EDITOR":
        newState = {
          ...state,
          setModal: "edit_article",
          isModalOpen: true,
          edittingPrams: {
            ...state.edittingPrams,
            isEditting: false,
          },
        };
        break;
      case "OPEN_FOOTER_ITEM_EDITOR":
        newState = {
          ...state,
          setModal: "edit_footer_item",
          isModalOpen: true,
          edittingPrams: {
            ...state.edittingPrams,
            isEditting: false,
            modalSize: "large",
          },
        };
        break;
      case "OPEN_ARTICLE_EDITOR_FOR_EDIT":
        newState = {
          ...state,
          setModal: "edit_article",
          isModalOpen: true,
          edittingPrams: {
            isEditting: true,
            article: { ...action.payload },
            footerItem: state.edittingPrams.footerItem,
            modalSize: "large",
          },
        };
        break;
      case "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT":
        newState = {
          ...state,
          setModal: "edit_footer_item",
          isModalOpen: true,
          edittingPrams: {
            isEditting: true,
            article: state.edittingPrams.article,
            footerItem: { ...action.payload },
            modalSize: action.payload.modal_size,
          },
        };
        break;
      case "SET_MODAL_SIZE":
        newState = {
          ...state,
          edittingPrams: {
            ...state.edittingPrams,
            modalSize: action.payload,
          },
        };
        break;

      case "SET_USER_INFO":
        newState = {
          ...state,
          isModalOpen: false,
          userInfo: { ...state.userInfo, ...action.payload },
        };
        break;
      case "SET_THEME":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            selected_theme: action.payload.selectedTheme,
          },
        };
        break;
      case "SET_ARTICLES":
        // ! を使うとうまく行かなかった。。。        
        const isShowInstagram = action.payload.showArticles === true ? false : true;
        newState = {
          ...state,
          selectedArticlesTags: action.payload.selectedArticlesTags,
          isSetting: action.payload.isSetting,
          articles: action.payload.data.rawData,
          paginationParams: action.payload.data.pagination,
          isShowInstagram: isShowInstagram,
          loading: {
            ...state.loading,
            mainArticles: false,
          },
        };
        break;
      case "SET_FOOTER_ITEMS":
        newState = {
          ...state,
          footerItems: action.payload,
        };
        break;

      case "DELETE_FOOTER_ITEM":
        const deletedState = state.footerItems.filter((value, index) => {
          // 削除するアイテムは含めない
          return value.footer_item_id !== action.payload.footer_item_id;
        });
        newState = {
          ...state,
          footerItems: deletedState.map((value, index) => {
            // 削除されたアイテムの左側のorderはそのまま出力
            if (value.order < action.payload.order) {
              return value;
              // 削除されたアイテムの右側はorderの調整のためそれぞれ-1する
            } else if (value.order > action.payload.order) {
              value.order -= 1;
              return value;
            }
          }),
        };
        break;
      case "SET_TAGS":
        newState = {
          ...state,
          tags: action.payload,
        };
        break;
      case "SET_INSTAGRAM_ACCOUNTS":
        newState = {
          ...state,
          instagramAccounts: action.payload,
        };
        break;
      case "SET_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
          isShowInstagram: true,
          selectedInstagramAccount: action.payload.selectedInstagramAccount,
          selectedArticlesTags: [],
          instagramMedias: action.payload.data,
          loading: {
            ...state.loading,
            mainArticles: false,
          },
        };
        break;

      default:
        console.log("エラーだよ,appStateReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action })
    return newState
}
