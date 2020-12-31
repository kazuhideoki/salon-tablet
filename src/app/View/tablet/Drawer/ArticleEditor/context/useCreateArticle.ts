import React from "react";
import { useGetArticles } from "../../../Main/context/lib/useGetArticles";
import { T_articles_create, apiArticlesCreate } from "../../../../../../pages/api/articles/create";
import { T_data_type_article } from "../../../../../Store/Interface";
import { UserInfoContext } from "../../../../../Store/userInfo/Context";
import { AppStateContext } from "../../../../../Store/appState/Context";
import { closeModal, isLoadingMain } from "../../../../../Store/appState/actions";

export type TCreateArticle = {
  is_published: boolean
  titleText: string;
  editorText: string;
  editorTextExcerpt: string;
  editorImg: string;
  selectedTags: number[];
  dataType: T_data_type_article
};
export const useCreateArticle =  () => {
  const getArticles = useGetArticles();
  const { appState, dispatchAppState } = React.useContext(
    AppStateContext
  );
  const { userInfo } = React.useContext(UserInfoContext);
  
  return async ( param: TCreateArticle) => {

    dispatchAppState(closeModal());
    dispatchAppState(isLoadingMain(true));
    
    const params: T_articles_create = {
      is_published: param.is_published,
      title: param.titleText,
      article_content: param.editorText,
      article_excerpt: param.editorTextExcerpt,
      article_img: param.editorImg,
      tag_ids: param.selectedTags.length
      ? JSON.stringify(param.selectedTags)
      : null,
      data_type: param.dataType,
      user_id: userInfo.user_id,
    };

    try {
      const data = await apiArticlesCreate(params)
      
      dispatchAppState(closeModal())
      getArticles(appState.isSetting, 1, []);

    } catch (e) {
      alert("投稿できませんでした");
      dispatchAppState(isLoadingMain(false));
    }

  };
};