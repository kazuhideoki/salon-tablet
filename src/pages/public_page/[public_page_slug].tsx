import React from 'react';
import { GetServerSideProps } from 'next';
import { generateProps } from '../../util/db/generateProps';
import App from '../../app/container/App';
import Head from 'next/head';
import { IndexProps } from '..';
import { checkIsGeneratePubulicPage } from '../../util/db/checkIsGeneratePubulicPage';
import { makeStyles, Typography, Theme, createStyles } from '@material-ui/core';
import { UserInfo } from '../../util/interface/Interface';
import { getDeviceType } from '../../util/getDeviceType';
import { SamplePage } from '../../app/stores/appState/initialValue';
import { SEO } from '../../app/components/pages/SEO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(3),
    },
  })
);

const PublicPage = (props: IndexProps) => {
  const classes = useStyles();

  if (props.data && props.session) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <App {...props} data={props.data} session={props.session} />
      </>
    );
  } else {
    return (
      <>
        <SEO noindex />
        <Typography
          className={classes.typography}
          align="center"
          variant="h4"
          component="h2"
          gutterBottom
          color="textSecondary">
          パブリックページが有効化されていません
        </Typography>
      </>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const device = getDeviceType(req);

  const slug = req.url;
  if (slug === undefined) throw `slug is undefined`;

  let userInfo: UserInfo | null = null;
  const slicedSlug = slug.replace('/public_page/', '');
  // サンプルページのiframeでで間違い半手せれてしまうため?以降のqueryとる
  const publicPageSlug = slicedSlug.split('?')[0];
  try {
    // slugがDBにあるかどうかチェックして、「表示させているか？」「slug」を返す
    userInfo = await checkIsGeneratePubulicPage(publicPageSlug);

    if (userInfo === null) throw `userInfo is null`;
    const returnData: IndexProps = {
      data: await generateProps(userInfo, true),
      isPublicPage: true,
      device: device,
      samplePage: query?.['sample'] as SamplePage,
      // sessionを入れてAppBarを表示させなくする
      session: { email: 'sample@sample.com', emailVerified: true },
    };

    return { props: returnData };
  } catch (err) {
    return { props: { isPublicPage: false } };
  }
};

export default PublicPage;
