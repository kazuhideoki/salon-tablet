import { useChangeShowArticleType } from "./lib/useChangeShowArticleType";
import { T_show_article_type } from "../../../../../Store/Interface";

export const useHandleChangeShowArticleType = () => {
  const changeShowArticleType = useChangeShowArticleType()

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    changeShowArticleType(
      (event.target as HTMLInputElement).value as T_show_article_type
    );
  };
}