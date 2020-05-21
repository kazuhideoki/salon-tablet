import React from "react";
import {
  Store,
  T_is_published_articles,
  T_title,
  T_article_content,
  T_id,
  T_article_excerpt,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { useGetArticles } from "./useGetArticles";
import { Quill } from "react-quill";


type TCreateArticle = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt
};
export const useCreateArticle = () => {
  const getArticles = useGetArticles();
  const { dispatchAppState } = React.useContext(Store);
  const {
    setEditorText,
    setTitleText,
    titleText,
    editorText,
    editorTextExcerpt,
  } = React.useContext(EditorContext);
  return async (isPublishing: boolean) => {
    const params: TCreateArticle = {
      is_published: isPublishing,
      title: titleText,
      article_content: editorText,
      article_excerpt: editorTextExcerpt,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/articles/create`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      console.log(data);

      alert("投稿できませんでした");
    } else {
      setEditorText("");
      setTitleText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(1);
    }
  };
};
