import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../lib/loadUrl";
import { IncomingMessage } from "http";
import { parseCookies } from "nookies";
import { T_auth_get_session, T_auth_get_session_return } from "../../pages/api/auth/get_session";
import { TApiResponse } from "../apiTypes";

export const getSession = async (
  params: T_auth_get_session
): Promise<TApiResponse<T_auth_get_session_return>> => {
  let str = process.browser ? server : localhost;

  const st_token = parseCookies({ req: params.req })["st_token"];

  const res = await fetch(`${str}/api/auth/get_session`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ st_token }),
  });

  const result = await res.json();

  if (result.err) {
    return null;
  }

  return result;
};
