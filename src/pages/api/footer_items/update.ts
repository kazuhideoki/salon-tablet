import { db } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_footer_item_id } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/apiWrap';
import { checkIsAdmin } from '../../../lib/checkIsAdmin';
import { T_footer_items_params } from './create';
import { apiWrapPost } from '../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsUpdate = async (
  params: T_footer_items_update
): Promise<TApiResponse> => {
  return apiWrapPost('footer_items/update', params);
};

export type T_footer_items_update_params = T_footer_items_params;
export type T_footer_items_update = {
  params: T_footer_items_update_params;
  id: T_footer_item_id;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { params, id }: T_footer_items_update = req.body;

    try {
      const isAdmin = await checkIsAdmin({ req });

      if (isAdmin === false) {
        params.data_type = 'default_data';
      }

      const data = await db(
        `UPDATE footer_items SET ? WHERE footer_item_id = ?`,
        [params, id]
      );

      console.log('/footer_items/update/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/footer_items/update/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default update;
