import React from "react";
import { TUserInfo, TArticles, PaginationParams, FooterItems, TTags, TInstagramAccounts } from "../app/Store/Store";
import { App } from "../app/View/App";
//@ts-ignore
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { db } from "./api/lib/db";
import { NextPageContext } from "next";
//@ts-ignore
import { TopPage } from "../pageComponent/TopPage";
import { T_articles_get } from "./api/articles/get";
import { localhost } from "../config";

export type IndexProps = {
  data: {
    articles: TArticles;
    pagination: PaginationParams;
    footerItems: FooterItems;
    tags: TTags;
    instagramAccounts: TInstagramAccounts
    session?: TUserInfo;
  };
  csrfToken?: any;
  providers?: any
  bcrypt_password?: string;
  // instagram_access_denied?: boolean
};

const Index = (props: IndexProps) => {
  if (!props.data.session) {
    // console.log("porvidersは" + JSON.stringify(props.providers));

    return (
      <>
        <TopPage csrfToken={props.csrfToken} providers={props.providers}/>
      </>
    );

  }

  // props.instagram_access_denied ? alert('インスタグラムアカウントのせつぞくができませんでした。') : null

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

export async function getServerSideProps(context: NextPageContext) {  

  // apiでうまく実装できなかったので、とりあえずここに直接書いておく ※要リファクタリング
  const req = context.req;
  // const sessionObj: TSessionOnj = await session({ req });
  // ↓document通りだけど、これはうまく行かない?
  const sessionObj: TSessionOnj = await getSession({ req });
  // console.log("sessionObjは " + JSON.stringify(sessionObj));
  let userInfo: TUserInfo;

  // ★★★セッションがある
  if (sessionObj !== null) {
    const res = await db(
      "select * from `user_info` where `user_email` = ?",
      sessionObj.user.email
    );
    userInfo = res[0];
    const { user_id } = userInfo

    // ★★★ユーザーデータがある
    if (userInfo) {

      // ★★★ パスワードの有無
      if (userInfo.bcrypt_password) {
        userInfo.isSetPassword = true;
      } else {
        userInfo.isSetPassword = false;
      }
      // bcrypt_passwordはフロント側に渡さない bcrypt_passwordは削除
      delete userInfo.bcrypt_password;
      // console.log("userInfoは " + JSON.stringify(userInfo));


      let data
      let data2
      let data3
      let data4
      // ★★★最初のサインイン サンプルデータの追加
      if (userInfo.is_first_sign_in) {
        // console.log("indexのis_first_sign_inのとこだよ");
        
        // const res = await fetch(`http://localhost:3000/api/create_sample_data`, {
        const res = await fetch(`${localhost}/api/create_sample_data`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          mode: "cors",
          body: JSON.stringify(user_id),
        });

        

      }

      // 記事一覧取得
      const articlesParam: T_articles_get = {
        page: 1,
        selectingTags: [],
        isSetting: true,
        userId: userInfo.user_id,
      };
      // const res = await fetch(`http://localhost:3000/api/articles/get`, {
      const res = await fetch(`${localhost}/api/articles/get`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(articlesParam),
      });

      data = await res.json();

      // アイテム一覧取得
      const res2 = await fetch(
        // `http://localhost:3000/api/footer_items/get?userId=${userInfo.user_id}`
        `${localhost}/api/footer_items/get?userId=${userInfo.user_id}`
      );
      data2 = await res2.json();

      // タグ一覧取得

      const res3 = await fetch(
        // `http://localhost:3000/api/tags/get?userId=${userInfo.user_id}`
        `${localhost}/api/tags/get?userId=${userInfo.user_id}`
      );
      data3 = await res3.json();

      const res4 = await fetch(
        // `http://localhost:3000/api/instagram_accounts/get?userId=${userInfo.user_id}`
        `${localhost}/api/instagram_accounts/get?userId=${userInfo.user_id}`
      );
      data4 = await res4.json();
      // access_tokenはフロント側に渡さない access_tokenは削除
      delete data4.access_token;
      // console.log("instagram_accounts（data4）は " + JSON.stringify(data4));



      return {
        props: {
          data: {
            articles: data ? data.rawData : [],
            pagination: data ? data.pagination : [],
            footerItems: data2 ? data2.rawData : [],
            tags: data3 ? data3.rawData : [],
            instagramAccounts: data4 ? data4.rawData : [],
            // JSONのエラーになったので、このような書き方↓
            session: userInfo && JSON.parse(JSON.stringify(userInfo)),
          },
        },
      };

    } // ★★★ユーザーデータがある

  } // ★★★セッションがある

  // ※もしかしたら↓うまく行かないこともあるかもしれないが、スッキリさせた
  // ★★★セッションがない
  if (sessionObj === null || !userInfo) {
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
}

export default Index;
