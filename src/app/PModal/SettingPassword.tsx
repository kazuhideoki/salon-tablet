import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { Store } from '../Store/Store';
import { useGetArticle } from '../Store/articles/articlesActionCreator';

export const SettingPassword = () => {
  const { dispatchAppState, paginationParams } = React.useContext(Store)
  const getArticle = useGetArticle()

  const hancleOnClick = () => {
    dispatchAppState({ type: "ON_IS_SETTING" })
    // ON_IS_SETTINGのあとなので全記事を読み込む
    // getArticle(paginationParams.page)
    dispatchAppState({ type: "CLOSE_MODAL" })

  }

  return (
    <div>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
      />
      <Button onClick={() => hancleOnClick()}>設定</Button>
    </div>
  );
}
