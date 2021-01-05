import { server, localhost } from '../loadUrl';

export type ApiResponse<T = null> = { err: boolean; rawData: T };
// | { err: true; data: string };

const fetchPost = async (str: string, url: string, params: any) => {
  return await fetch(`${str}/api/${url}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(params),
  });
};

const fetchGet = async (str: string, url: string) => {
  return await fetch(`${str}/api/${url}`);
};

const apiWrap = async <T>(
  fetch: any,
  url: string,
  params?: any
): Promise<ApiResponse<T>> => {
  const str = typeof window !== 'undefined' ? server : localhost;

  try {
    const res = await fetch(str, url, params);
    const result = (await res.json()) as ApiResponse<T>;
    if (result.err) throw result.rawData; // エラー内容をthrowする
    return result;
  } catch (err) {
    throw `${url}: ${err}`;
  }
};

export const apiWrapPost = async <T = null>(
  url: string,
  params: any
): Promise<ApiResponse<T>> => await apiWrap<T>(fetchPost, url, params);

export const apiWrapGet = async <T = null>(url: string) =>
  apiWrap<T>(fetchGet, url, null);
