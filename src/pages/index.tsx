import React from "react";
import { TUserInfo, TArticles, PaginationParams, FooterItems, TTags, TInstagramAccounts, TInstagramMedias, TInfoBar, TAllArticles } from "../app/Store/Types";
import { App } from "../app/View/App";
//@ts-ignore
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { GetServerSideProps } from "next";
//@ts-ignore
import { TopPage } from "../pageComponent/TopPage";
import { T_articles_get, apiArticlesGet } from "./api/articles/get";
import { localhost, server } from "../config";
import { ApiUserInfoGetFromEmail } from "./api/user_info/getUserInfoFromEmail";
import { apiFooterItemsGet } from "./api/footer_items/get";
import { apiTagsGet } from "./api/tags/get";
import { apiInstagramAccountsGet } from "./api/instagram_accounts/get";
import { apiCreateSampleData } from "./api/create_sample_data";
import { apiCreateInfoBar } from "./api/info_bar/create_init";
import { apiCheckHasInfoBar } from "./api/info_bar/check_has_info_bar";

export type IndexPropsData = {
  articles: TArticles;
  pagination: PaginationParams;
  allArticles: TAllArticles
  footerItems: FooterItems;
  infoBar: TInfoBar;
  tags: TTags;
  instagramAccounts: TInstagramAccounts;
  // instagramMedias: TInstagramMedias
  session?: TUserInfo;
};

export type IndexProps = {
  data: IndexPropsData;
  csrfToken?: any;
  providers?: any;
  bcrypt_password?: string;
  message?: string;
};

const Index = (props: IndexProps) => {

  if (!props.data.session) {

    console.log('serverは ' + server);
    

    return (
      <>
        <TopPage csrfToken={props.csrfToken} providers={props.providers}/>
      </>
    );

  }

  console.log("serverは " + server);

  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
      <App data={props.data} />
    </>
  );
};

export type TSessionOnj = {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  expires: string | null;
};

export const getServerSideProps: GetServerSideProps =  async (context) => {  

  const req = context.req;
  const sessionObj: TSessionOnj = await getSession({ req });
  console.log("index.tsxのsessionObjは " + JSON.stringify(sessionObj));
  let userInfo: TUserInfo;

  // ★★★セッションがある
  if (sessionObj !== null) {
    const userInfo = await ApiUserInfoGetFromEmail(sessionObj.user.email);

    // ★★★ユーザーデータがある
    if (userInfo) {

      // ★★★最初のサインイン サンプルデータの追加
      if (userInfo.is_first_sign_in) {
        apiCreateSampleData({user_id: userInfo.user_id})
        apiCreateInfoBar({user_id: userInfo.user_id})
      }

      const hasInfoBar = await apiCheckHasInfoBar({ user_id: userInfo.user_id });
      if (hasInfoBar === false) {
         apiCreateInfoBar({ user_id: userInfo.user_id });
      }

      // 記事一覧取得
      const articlesParam: T_articles_get = {
        page: 1,
        selectingTags: [],
        isSetting: true,
        userId: userInfo.user_id,
      };
      
      // const data6 = {err: true} // テーブル  instagram_medias実装までつなぎ

      // 並列処理でデータを取ってくる
      // const [data, data2, data3, data4, data5] = await Promise.all([
      const [data, data2, data4, data5] = await Promise.all([
        apiArticlesGet(articlesParam),        
        apiFooterItemsGet(userInfo.user_id),
        // apiInfoBarGet(userInfo.user_id), // ※data3も追加する
        apiTagsGet(userInfo.user_id),
        apiInstagramAccountsGet(userInfo.user_id),
      ]);

      // 形付けるとpaginationのところにエラーが出た。未解決
      // const propsData: IndexPropsData = {
      const propsData = {
        articles: data.err ? [] : data.rawData,
        pagination: data.err ? [] : data.pagination,
        allArticles: data.err ? [] : data.allArticles,
        footerItems: data2.err ? [] : data2,

        // infoBar: data3.err ? [] : data3,

        tags: data4.err ? [] : data4,
        instagramAccounts: data5.err ? [] : data5,
        // instagramMedias: data6.err ? {data: []} : data6,
        // JSONのエラーになったので、このような書き方↓
        session: userInfo && JSON.parse(JSON.stringify(userInfo)),
      };

      return {
        props: {
          data: propsData,
          // メッセージがあれば表示
          message: context.query || null,
        },
      };

    } // ★★★ユーザーデータがある

  } // ★★★セッションがある

  // ※もしかしたら↓うまく行かないこともあるかもしれないが、スッキリさせた
  // ★★★セッションがない
  
  const token = await getCsrfToken();
  return {
    props: {
      data: {
        session: null,
      },
      csrfToken: token,
      providers: await providers(context),
      // instagram_access_denied: context.query.instagram_access_denied || false,
    },
  };
  
}

export default Index;
