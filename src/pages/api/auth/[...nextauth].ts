import NextAuth from "next-auth";
import Providers from "next-auth/providers";
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
  
  ],
  database: process.env.DATABASE_URL,
  jwt: false,
  sessionMaxAge: 24 * 60 * 60 * 1000, // Expire sessions
 
  // pages: {
  //   signin: "/auth/signin",
  // },
};

export default (req, res) => NextAuth(req, res, options);

// create trigger insert_user_trigger after insert on user for each row insert into user_info (user_id, email) select id, email from user where id = LAST_INSERT_ID();

// insert into user_info (user_id, email) select id, email from user where id = 1;