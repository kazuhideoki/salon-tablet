import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { db } from "../lib/db";
import { T_check_credentials } from "../user_info/check_credentials";
import authorizeCredentials from "../lib/authorizeCredentials";
// これで環境変数(.envファイル)が使えるようになる
require("dotenv").config();

const site =
  process.env.NODE_ENV !== "production"
    ? process.env.SITE
    : process.env.SITE_PRO;

const options = {
  // site: process.env.SITE,
  site: site,
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Credentials({
      authorize: async (credentials) => authorizeCredentials(credentials),
      credentials: {
        // domain: {
        //   label: "Domain",
        //   type: "text ",
        //   placeholder: "CORPNET",
        //   value: "CORPNET",
        // },
        email: { label: "Email", type: "text ", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  database: process.env.DATABASE_URL,

  // ※↓こちらはいらない？
  // jwt: true,

  // ↓ここなくすと credentialsでエラー
  // 'Signin in with credentials is only supported if JSON Web Tokens are enabled'
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, token) => {
      console.log(
        JSON.stringify(
          "callbacks sessionだよ sessionは " +
            JSON.stringify(session) +
            " tokenは " +
            JSON.stringify(token)
        )
      );
      return Promise.resolve(session)
    },
    jwt: async (token, oAuthProfile) => {
      console.log(
        JSON.stringify(
          "callbacks jwtだよ tokenは " +
            JSON.stringify(token) +
            " oAuthProfileは " +
            JSON.stringify(oAuthProfile)
        )
      );
      return Promise.resolve(token)
    },

    //     event - compiled successfully
    // [next-auth][error][CLIENT_FETCH_ERROR] [
    //   'null/session',
    //   TypeError: Only absolute URLs are supportedに対して特に変化なし
    redirect: async (url, baseUrl) => {
      console.log(JSON.stringify("callbacks redirectだよ urlは " + url + " baseUrlは " + baseUrl));
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },

  sessionMaxAge: 24 * 60 * 60 * 1000, // Expire sessions
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);


