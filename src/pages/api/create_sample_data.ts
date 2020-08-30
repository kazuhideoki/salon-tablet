import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TArticle, FooterItems, FooterItem, T_user_id } from "../../app/Store/Types";
import { TApiResponse } from "../../lib/apiTypes";
import { server, localhost } from "../../config";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCreateSampleData = async (
  params: T_create_sample_data
): Promise<TApiResponse<void>> => {
  const str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/create_sample_data`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_create_sample_data = {
  user_id: T_user_id
};

const create_sample_data = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") { 
    console.log("create_sample_data.tsだよ");
    

  const { user_id }: T_create_sample_data = req.body;

    try {
          // まずdata_type === 'sample_data'の記事を取得
          const data: any = await db(
            `SELECT * FROM articles WHERE data_type = 'sample_data' ORDER BY created_at DESC`
          );
          const params = data.map((article: TArticle) => {
            delete article.article_id;
            delete article.created_at;
            delete article.updated_at;

            article.data_type = "default_data";
            article.user_id = user_id;
            return article;
          });

          // ↓全部いっぺんにやる方法あるはず
          const data20 = await db(`INSERT INTO articles SET ?`, params[0]);
          const data21 = await db(`INSERT INTO articles SET ?`, params[1]);
          const data22 = await db(`INSERT INTO articles SET ?`, params[2]);

          // sample_dataのアイテムを取得
          const itemData: any = await db(
            `SELECT * FROM footer_items WHERE data_type = 'sample_data' ORDER BY created_at DESC`
          );

          const itemParams = itemData.map((item: FooterItem) => {
            delete item.footer_item_id;
            delete item.created_at;
            delete item.updated_at;

            item.data_type = "default_data";
            item.user_id = user_id;
            return item;
          });

          const itemsData20 = await db(
            `INSERT INTO footer_items SET ?`,
            itemParams[0]
          );
          const itemsData21 = await db(
            `INSERT INTO footer_items SET ?`,
            itemParams[1]
          );
          const itemsData22 = await db(
            `INSERT INTO footer_items SET ?`,
            itemParams[2]
          );

          const data3 = await db(
            `UPDATE user_info SET is_first_sign_in = '0' WHERE user_id = ?;`,
            user_id
          );
          // console.log("data3は " + JSON.stringify(data3));

          res.end();
        } catch (err) {
      console.log("/create_sample_dataのエラーは " + JSON.stringify(err));
      res.status(500).json({ err: true, data: { message: err.message } });
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

export default create_sample_data;
