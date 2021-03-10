import {
  makeStyles,
  Theme,
  Typography,
  createStyles,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import { server } from '../../../util/loadUrl';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: 'flex',
    },
    item: {
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
    },
    itemFlex: {
      width: '30%',
    },
    img: {
      display: 'block',
      margin: theme.spacing(0, 'auto', 6),
      borderRadius: '50%',
      // width: 200,
      // height: 200,
      objectFit: 'cover',
    },
    typo: {
      margin: theme.spacing(6, 0),
    },
  })
);

export const AboutST = () => {
  const classes = useStyles();

  const isLargeDisplay = useMediaQuery('(min-width:600px)');

  return (
    <div>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        align="center"
        className={classes.typo}>
        SALON TABLETとは?
      </Typography>
      <div className={isLargeDisplay ? classes.flex : ''}>
        {[
          {
            src: '/images/hair_stylist.jpg',
            text:
              'お客さんと美容師らしいコミュニケーションはとれていますか？美容室のデジタル版ポップ作成のお手伝いでSALON TABLETは単価アップに貢献します。',
          },
          {
            src: '/images/manage_st.jpg',
            text:
              '顧客管理、雑誌アプリ、ヘアカタログ、インスタグラム、ポップ、検索,etc...。現代の美容師には欠かせないデジタルツール。SALON TABLETはきれいに整頓します。',
          },
          {
            src: '/images/tablet_desk.jpg',
            text:
              'おしゃれな美容室のインテリア、無機質なタブレット。SALON TABLETはマッチングさせます。',
          },
        ].map((value, index) => {
          return (
            <div
              key={index}
              className={`${classes.item} ${
                isLargeDisplay ? classes.itemFlex : ''
              }`}>
              <Image
                src={value.src}
                layout="fixed"
                width={200}
                height={200}
                className={classes.img}
              />
              <Typography
                variant="body1"
                component="p"
                gutterBottom
                align="center"
                className={classes.typo}>
                {value.text}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};
