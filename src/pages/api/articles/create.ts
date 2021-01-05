import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  T_is_published_articles,
  T_title,
  T_article_content,
  T_article_excerpt,
  T_article_img,
  T_data_type_article,
} from '../../../util/interface/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { checkIsAdmin } from '../../../util/db/checkIsAdmin';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiArticlesCreate = async (
  params: T_articles_create
): Promise<TApiResponse> => {
  return apiWrapPost('articles/create', params);
};

export type T_articles_create = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  tag_ids: string | null;
  data_type: T_data_type_article;
  user_id: number;
};

export type T_articles_create_return = {
  rawData: unknown;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: T_articles_create = req.body;

    try {
      const isAdmin = await checkIsAdmin({ req });

      if (isAdmin === false) {
        params.data_type = 'default_data';
      }

      await db(`INSERT INTO articles SET ?`, params);

      await db(`SELECT * FROM articles WHERE user_id = ?`, params.user_id);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/articles/create/のエラーは ' + JSON.stringify(err));

      res.status(500).json({ err: true, rawData: err } as TApiResponse);
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

export default create;
