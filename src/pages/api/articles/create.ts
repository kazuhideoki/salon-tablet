import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_is_published_articles,
  T_title,
  T_article_content,
  T_article_excerpt,
  T_article_img,
  T_user_id,
  T_data_type_article,
} from "../../../app/Store/Interface";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { checkIsAdmin } from "../../../lib/checkIsAdmin";
import { apiWrapPost } from "../../../lib/apiWrap";


export const apiArticlesCreate = async (params: T_articles_create):Promise<TApiResponse<T_articles_create_return>> => {
  return apiWrapPost("articles/create", params);
} 

export type T_articles_create = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  tag_ids: string | null;
  data_type: T_data_type_article,
  user_id: T_user_id;
};

export type T_articles_create_return = {
  rawData: unknown;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    const params: T_articles_create = req.body;

    try {
      const isAdmin = await checkIsAdmin({req})
      
      if (isAdmin === false) { 
        params.data_type = 'default_data'
      }

      const data = await db(`INSERT INTO articles SET ?`, params);
      console.log("/articles/create/は " + JSON.stringify(data));

      const data2: any = await db(`SELECT * FROM articles WHERE user_id = ?`, params.user_id);

      const returnData: T_articles_create_return = {
        rawData: data,
      };
      return res.status(200).json(returnData);

    } catch (err) {
      console.log("/articles/create/のエラーは " + JSON.stringify(err));

      return res.status(500).json({ err: true, data: err });

    }

  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default create