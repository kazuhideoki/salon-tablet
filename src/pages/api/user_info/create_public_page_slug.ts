import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCreatePublicPageSlug = async (
  params: ApiCreatePublicPageSlug
): Promise<TApiResponse<void>> => {
  return apiWrapPost('user_info/create_public_page_slug', params);
};

export type ApiCreatePublicPageSlug = {
  user_id: number;
};

const create_public_page_slug = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { user_id } = req.body as ApiCreatePublicPageSlug;

    try {
      // slug生成
      const public_page_slug =
        Math.random().toString(32).substring(2) + user_id;

      await db(`UPDATE user_info SET public_page_slug = ? WHERE user_id = ?`, [
        public_page_slug,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log(
        '/user_info/create_public_page_slug/のエラーは ' + JSON.stringify(err)
      );

      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// エラーメッセージ非表示

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
export default create_public_page_slug;
