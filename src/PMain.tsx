import React from "react";
import { Store, WpData, WpParams, PostData } from "./modules/Store";
import { formatDate } from "./modules/organizeData";
import { sqlToDate } from "./modules/organizeSql/sqlToDate";
import { sortDataPosts, SortDataPosts, setAuthorName } from "./modules/organizeData";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { pickStaffImg } from "./modules/pickStaffImg";
import { StyledPaper } from "./StyledComponent/StyledPaper";
import { useStylesFactory } from "./modules/useStylesFactory";
import { useUpdatePost } from "./modules/postDataRducer";
import { UpdatePostButton } from "./molecules/UpdatePostButton";
import { DeletePostButton } from "./molecules/DeletePostButton";
import { CreatePostButton } from "./molecules/CreatePostButton";

const styles = {
    root: {
        overflow: "scroll",
        height: "100%",
    },
    item: {
        position: "relative",
        height: "100%",
    },
    article: {
        width: 350,
        height: "100%",
    },
    insta: {
        width: 408,
        height: "100%",
    },
    instaDiv: {
        position: "relative",
    },
    titleImgDiv: {
        position: "relative",
    },
    title: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: "40px 10px 0 10px",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5074404761904762) 33%, rgba(255,255,255,1) 100%)",
    },
    img: {
        objectFit: "cover",
        width: "100%",
        height: 300,
        backgroundSize: "cover",
    },
    staffImg: {
        width: 50,
    },
    updatePostButton: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 100,
    },
    deletePostButton: {
        position: "absolute",
        top: 0,
        right: 50,
        zIndex: 100,
    },
    createPostButton: {
        position: "absolute",
        top: 50,
        left: 100,
        zIndex: 100,
    },
};

export const PMain = () => {
    const classes = useStylesFactory(styles);

    const {
        appState,
      postData,
      wpParams,
      wpData,
      dispatchWpData,
      dispatchAppState,
      isSetting,
    } = React.useContext(Store);
    // 利用するデータを抜き出し、authorをnumberから名前に変える
    let articles = sortDataPosts(wpData.articles);
        articles = setAuthorName(articles, wpData)
        articles = formatDate(articles)

    const setAndOpenArticleModal = (data: object[]) => {
        dispatchWpData({type: "SET_SINGLE_ARTICLE", payload: data})
        dispatchAppState({ type: "OPEN_ARTICLE_MODAL"})
    }
    
    const props = {
      postData,
      wpParams,
      wpData,
      classes,
      articles,
      setAndOpenArticleModal,
    };
    type Props = typeof props


    const PMainPresenter: React.FC<Props> = ({
        postData,
        wpParams,
        wpData,
        classes,
        articles,
        setAndOpenArticleModal,
    }: Props) => {
        let displayArticles;
        const instaRef = React.useRef(null);

        //   const updataArticle = (key: number, content: string) => useUpdateArticle(key, content);

        //   インスタ表示のときはレイアウトを変える
        if (articles && wpParams.categories === 187) {
            displayArticles = articles.map((value, key: number) => {
                return (
                    <Grid item key={key} className={classes.item}>
                        <Card variant="outlined" className={classes.insta}>
                            <Typography gutterBottom variant="h6" align="right">
                                <h3>{value.date}</h3>
                            </Typography>
                            <div
                                className={classes.instaDiv}
                                dangerouslySetInnerHTML={{
                                    __html: value.content,
                                }}
                            />
                        </Card>
                    </Grid>
                );
            });
            //   通常の記事一覧の表示
        } else if (postData) {
            console.debug("PMainPresenter" + postData);

            displayArticles = postData.map((value, key: number) => {

                return (
                    <Grid item key={key} className={classes.item}>
                        {isSetting ? (
                            <UpdatePostButton
                                position={classes.updatePostButton}
                                // params={params}
                                // setIsEdit={setIsEdit}
                            />
                        ) : null}
                        {isSetting ? (
                            <DeletePostButton
                                position={classes.deletePostButton}
                                id={value.id}
                            />
                        ) : null}

                        <Card
                            variant="outlined"
                            className={classes.article}
                            id={`p_main_` + key}
                            onClick={() =>
                                setAndOpenArticleModal([postData[key]])
                            }
                        >
                            <CardActionArea>
                                <div className={classes.titleImgDiv}>
                                    <img
                                        className={classes.img}
                                        //   src={value.featuredImg}
                                        alt={value.title}
                                    />
                                    <Typography
                                        className={classes.title}
                                        variant="h5"
                                    >
                                        {value.title}
                                    </Typography>
                                </div>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        align="right"
                                    >
                                        {sqlToDate(value.date)}
                                        {/* {value.authorName} */}
                                    </Typography>
                                    <Typography variant="body1">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: value.content,
                                            }}
                                        />
                                        <p>{value.content}</p>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            });
            // 記事がもしなかった場合の表示
        } else {
            displayArticles = <StyledPaper>No articles</StyledPaper>;
        }

        // instaのiframeの表示サイズを変更させる
        React.useEffect(() => {
            // console.log(instaRef.current);
            if (wpParams.categories === 187) {
                //@ts-ignore
                const iframe = instaRef.current.getElementsByClassName(
                    "iframe-class"
                );
                Array.prototype.forEach.call(iframe, function (element: any) {
                    element.style.transform = "scale(1.2)";
                    element.style.transformOrigin = "left";
                });
            }
        });

        return (
            <Grid 
                id="p_main"
                container
                wrap="nowrap"
                className={classes.root}
                spacing={2}
                ref={instaRef}
            >
                {isSetting ? (
                    <CreatePostButton position={classes.createPostButton} />
                ) : null}
                {displayArticles}
            </Grid>
        );
    };



    return PMainPresenter(props);

}

