import React from "react";
import fetch from "node-fetch";
import { StoreContextProviderProps } from "../app/Store/Store";
// import * as serviceWorker from "../serviceWorker";

// ★★★ 通常版 サーバーサイドレンダリング
import { App } from "../app/App";
import { ThemeProvider } from "../app/Store/ThemeContext";
import { StoreContextProvider} from "../app/Store/Store";
import { EditorContextProvider } from "../app/Store/EditorContext";
import Head from "next/head";
import { register, unregister } from "next-offline/runtime";

// ★★★ デバック版↓? クライアントサイドレンダリングに
// import dynamic from "next/dynamic";
// const ThemeProvider = dynamic(() => import("../app/Store/ThemeContext"), {
//   ssr: false,
// });
// const StoreContextProvider = dynamic(() => import("../app/Store/Store"), {
//   ssr: false,
// });
// const EditorContextProvider = dynamic(() => import("../app/Store/EditorContext"), {
//   ssr: false,
// });
// const App = dynamic(() => import("../app/App"), {
//   ssr: false,
// });


const Index = (props: StoreContextProviderProps) => {
  // console.log("initialPropsは " + JSON.stringify(props));


  // service-worker.jsの登録と解除。unmount時に解除することで、キャッシュが残り画面が更新されない状態を防ぐ
  React.useEffect(() => {
    register()
    return () => {
      unregister()
    }
  },[])
   
  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
    {/* ↓これをつけるとdocumentPropsエラーになる */}
    <Head><title>SALON TABLET</title></Head>

    <StoreContextProvider data={props.data} >
      <ThemeProvider>
        <EditorContextProvider>
          <App />
        </EditorContextProvider>
      </ThemeProvider>
    </StoreContextProvider>
    </>
  );
};

export async function getServerSideProps() {

  // ここはサーバーサイドで実行されるのでhttpとlocalhostでOK
    const res = await fetch(`http://localhost:3000/articles/get/1`);
    const data = await res.json();
    console.log("articlesは " + JSON.stringify(data));
    const res2 = await fetch(`http://localhost:3000/footer_items/get`);
    const data2 = await res2.json();
    console.log("footerItemsは " + JSON.stringify(data2));

    if (data.err === true) {
      return null
    } else {
      return { props: { data:[ data, data2] } };
    }

  // const footerItems = async () => {
  //   const res = await fetch(`http://localhost:3000/footer_items/get`);
  //   const data = await res.json();
  //   console.log("footerItemsは " + JSON.stringify(data));

  //   if (data.err === true) {
  //     return null
  //   } else {
  //     return data
  //   }
  // }

  // Promise.all([articles, footerItems]).then(results => {
  //   return { props: { results } } // result = [ articlesの結果, footerItemsの結果 ]
  // }).catch(err => {
  //   console.log(err);
  // });
      
};

export default Index
