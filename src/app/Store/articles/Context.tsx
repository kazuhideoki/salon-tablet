import React from "react";
import { TAllArticles, TArticles, TPaginationParams } from "../Types";
import { TArticlesAction } from "./actions";
import { articlesReducer, ArticlesContextState } from "./reducer";

export type Props = ArticlesContextState;

export type ArticlesContextProps = ArticlesContextState & {
  dispatchArticles: React.Dispatch<TArticlesAction>;
};
export const ArticlesContext = React.createContext({} as ArticlesContextProps);

export const ArticlesContextProvider: React.FC<Props> = (
         props
       ) => {
         const [state, dispatchArticles] = React.useReducer(
           articlesReducer,
           props
         );

         const values: ArticlesContextProps = {
           articles: state.articles,
           allArticles: state.allArticles,
           paginationParams: state.paginationParams,
           dispatchArticles,
         };

         return (
           <ArticlesContext.Provider value={values}>{props.children}</ArticlesContext.Provider>
         );
       };

