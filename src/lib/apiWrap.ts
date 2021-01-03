import { server, localhost } from './loadUrl';

export type TApiResponse<T = void> = { err: boolean; rawData: T };
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
  params?: any,
  returning = true
): Promise<TApiResponse<T>> => {
  const str = process.browser ? server : localhost;

  try {
    const res = await fetch(str, url, params);
    if (returning) {
      const result = await res.json();
      if (result.err) throw result;
      return result;
    }
  } catch (err) {
    throw `${url}: ${err}`;
  }
};

export const apiWrapPost = async <T = void>(
  url: string,
  params: any,
  returning = true
): Promise<TApiResponse<T>> =>
  await apiWrap<T>(fetchPost, url, params, returning);

export const apiWrapGet = (url: string, returning = true) =>
  apiWrap(fetchGet, url, null, returning);
