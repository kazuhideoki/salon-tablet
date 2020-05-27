import React from "react";
import { FirstPage } from "@material-ui/icons";
import { pageArrowProps } from "./PPagination";
import { Store } from "../../../Store/Store";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";


//  ページ数が3より大きい場合latestとoldestを表示
export const Latest = (props: pageArrowProps) => {
    const { dispatchLoading, paginationParams } = React.useContext(Store);
    const {page, pageCount} = paginationParams
    const getArticles = useGetArticles();

    const hundleOnClick = () => {
      dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
      getArticles(1);
    };

    let onClick;
    let disable;
    if (page > 3 && pageCount > 3) {
      onClick = () => hundleOnClick();
      disable = null;
    } else {
      onClick = undefined;
      disable = props.classesDisable;
    }
    
    return (
        <FirstPage
            onClick={onClick}
            className={`${props.classesIcon} ${disable}`}
        />
    );
};