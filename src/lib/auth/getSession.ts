import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { firebaseAdmin } from "./firebaseAdmin";
import { parseCookies, setCookie, destroyCookie } from "nookies";

// export type TSession = ReturnType<typeof getSession>
export type TSession = {
  email: string;
};

export const getSession = async (
         context: GetServerSidePropsContext<ParsedUrlQuery>,
         failAndRedirect = false
       ) => {
         //  let email
         try {
           const cookies = parseCookies(context);
           // console.log('cookiesは ' + JSON.stringify(cookies))
           const token = await firebaseAdmin
             .auth()
             .verifyIdToken(cookies["token"]);
           // console.log('tokenは ' + JSON.stringify(token))
           // the user is authenticated!
           const { email } = token;
           return { email };
         } catch (err) {
           console.log("errは " + JSON.stringify(err));

           if (failAndRedirect) {
             context.res.writeHead(302, { Location: "/auth/signin" });
             context.res.end();
           }

           return null;
         }
       };