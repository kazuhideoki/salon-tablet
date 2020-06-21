import { db } from "../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { cipher, checkPassword } from "../../../module/bcrypt";
import { T_user_email } from "../../../app/Store/Store";

export type T_check_credentials = { user_email: T_user_email, password: string };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_email, password }: T_check_credentials = req.body;

    // 念の為、パスワード未設定で、パスワード未入力ログインを弾く
    if (password === '') {
      return res.status(500).json({ err: true, data: { message: "パスワードが未入力です" } });
    }

    console.log("check_credentialsのreq.bodyは " + JSON.stringify(req.body));
    

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(
        `select bcrypt_password from user_info where user_email = ?`,
        user_email
      );

      console.log("入力されたpasswordは " + JSON.stringify(password));
      console.log(
        "bcrypt_passwordは " + JSON.stringify(data[0].bcrypt_password)
      );

      const result = await checkPassword(password, data[0].bcrypt_password);

      // console.log("パスワードをcipherすると " + JSON.stringify(cipher(password)));

      console.log("/user_info/check_credentials/は " + JSON.stringify(result));

      return res.status(200).json(result);
    } catch (err) {
      console.log(
        "/user_info/check_credentials/のエラーは " + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, data: { message: err.message } });
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