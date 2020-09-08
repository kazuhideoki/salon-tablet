import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { cipher } from "../../../module/bcrypt";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { TSessionOnj } from "../..";
import { getSession } from "next-auth/client";
import { T_user_id, T_public_page_slug, T_user_email } from "../../../app/Store/Types";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCreatePublicPageSlug = async (
         params: T_user_info_create_public_page_slug
       ): Promise<TApiResponse<void>> => {
         let str = process.browser ? server : localhost;

         const res = await fetch(
           `${str}/api/user_info/create_public_page_slug`,
           {
             headers: { "Content-Type": "application/json" },
             method: "POST",
             mode: "cors",
             body: JSON.stringify(params),
           }
         );
         
         console.log("apiCreatePublicPageSlug完了");
        //  return await res.json();
       };


export type T_user_info_create_public_page_slug = {user_id: T_user_id, user_email: T_user_email}
// export type T_user_info_create_public_page_slug_return = {
//   publlic_page_slug: T_public_page_slug;
// };

const create_public_page_slug = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id, user_email } = req.body as T_user_info_create_public_page_slug
    
    try {
      // slug生成
      const publlic_page_slug = await cipher(user_email + user_id);

      await db(`UPDATE user_info SET public_page_slug = ? WHERE user_id = ?`, [publlic_page_slug, user_id])
      
      // const returnData: T_user_info_create_public_page_slug_return = {
      //   publlic_page_slug: publlic_page_slug,
      // };

      // return res.status(200).json(returnData);
      res.end()

    } catch (err) {
      console.log(
        "/user_info/create_public_page_slug/のエラーは " + JSON.stringify(err)
      );

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
export default create_public_page_slug;
