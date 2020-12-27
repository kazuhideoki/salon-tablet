import React from 'react'
import { ArticleContext } from '../../../../../Store/articles/Context';
import { Store } from '../../../../../Store/Store';

export const useStateInfoBarEditor = () => {
  const { appState } = React.useContext(Store);
  const { allArticles } = React.useContext(ArticleContext)
  const {
    info_bar_type,
    scrolling_sentence,
    selected_article_id,
  } = appState.infoBarData.infoBar;

  const [infoBarType, setInfoBarType] = React.useState(info_bar_type);
  const [editorText, setEditorText] = React.useState(scrolling_sentence);
  const [articleInfoBar, setArticleInfoBar] = React.useState(
    selected_article_id as number
  );
  const [charCount, setCharCount] = React.useState(0);

  return {
    allArticles,
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    articleInfoBar,
    setArticleInfoBar,
    charCount,
    setCharCount,
  };
}