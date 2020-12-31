import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { T_user_id } from "../../../app/Store/Types";
import { apiWrapPost } from "../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiIsFirsSigninFalse = async (
         params: user_info_is_first_signin_false
       ) => {
         return apiWrapPost(params, "user_info/is_first_signin_false");
       };

type user_info_is_first_signin_false = {
  user_id: T_user_id
}

const is_first_signin_false = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id } = req.body as user_info_is_first_signin_false
    try{
      
      const data = await db(
        `UPDATE user_info SET is_first_sign_in = 0 WHERE user_id = ?`,
        user_id
      );
      res.end()

    } catch (err) {
      console.log("/user_info/is_first_signin_false/のエラーは " + JSON.stringify(err));

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
export default is_first_signin_false;
