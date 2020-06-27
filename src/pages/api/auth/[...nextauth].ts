import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import authorizeCredentials from "../lib/authorizeCredentials";
// これで環境変数(.envファイル)が使えるようになる
require("dotenv").config();

const options = {
  site: process.env.SITE,
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Credentials({
      authorize: async (credentials) => authorizeCredentials(credentials),
      credentials: {
        email: { label: "Email", type: "text ", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  database: process.env.DATABASE_URL,

  // ↓ここなくすと credentialsでエラー
  // 'Signin in with credentials is only supported if JSON Web Tokens are enabled'
  session: {
    jwt: true,
  },
  // callbacksはlogを見る用にためしに設定してみた。
  // callbacks: {
  //   session: async (session, token) => {
  //     console.log(
  //       JSON.stringify(
  //         "callbacks sessionだよ sessionは " +
  //           JSON.stringify(session) +
  //           " tokenは " +
  //           JSON.stringify(token)
  //       )
  //     );
  //     return Promise.resolve(session);
  //   },
  //   jwt: async (token, oAuthProfile) => {
  //     console.log(
  //       JSON.stringify(
  //         "callbacks jwtだよ tokenは " +
  //           JSON.stringify(token) +
    //         " oAuthProfileは " +
    //         JSON.stringify(oAuthProfile)
    //     )
    //   );
    //   return Promise.resolve(token);
    // },
    // redirect: async (url, baseUrl) => {
    //   console.log(
    //     JSON.stringify(
    //       "callbacks redirectだよ urlは " + url + " baseUrlは " + baseUrl
    //     )
    //   );
    //   return url.startsWith(baseUrl)
    //     ? Promise.resolve(url)
    //     : Promise.resolve(baseUrl);
    // },
  // },

  sessionMaxAge: 24 * 60 * 60 * 1000, // Expire sessions
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);


