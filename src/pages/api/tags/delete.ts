import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTagIdInArticle } from '../../../util/db/deleteTagIdInArticle';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsDelete = async (
  params: ApiTagsCreate
): Promise<TApiResponse> => {
  return apiWrapPost('tags/delete', params);
};

export type ApiTagsCreate = { tag_id: number; user_id: number };

const tags_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { tag_id, user_id }: ApiTagsCreate = req.body;

    try {
      // articleのtag_idsの該当タグを消す。DBのtab_idsは文字列だが、うまいこと該当タグのtag_id:numberだけをを削除する
      await deleteTagIdInArticle(tag_id, user_id);

      // ★タグそのものを消す
      await db(`DELETE FROM tags WHERE tag_id = ?`, tag_id);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/tags/delete/のエラーは ' + JSON.stringify(err));

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

export default tags_delete;
