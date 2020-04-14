import React from 'react'
import { PostData, Store, PostDataSingle } from "./Store";
import { reducerLogger } from "./reducerLogger";
import fetch from "node-fetch";
import { StepContent } from '@material-ui/core';

export type PostDataAction =
  | { type: "GET"; payload: PostData }
  | { type: "CREATE_POST", payload: PostDataSingle }
  | { type: "UPDATE_POST"; payload: PostDataSingle }
  | { type: "DELETE_POST"; payload: { id: number } };

export function postDataReducer(state: PostData, action: PostDataAction) {
    let newState: PostData;
    const func = postDataReducer;
    switch (action.type) {
      case "GET":
        newState = action.payload;
        break;
      case "CREATE_POST":
        const arr = [...state, action.payload];
        newState = arr.concat();
        break;
      case "UPDATE_POST":
          newState = state.map((value, index) => {
            if (value.id === action.payload.id) {
                return action.payload
            } else {
                return value
            }
          })
        break;
      case "DELETE_POST":
        newState = state.filter((value, index) =>{
            return value.id !== action.payload.id;
        })
        break;

      default:
        console.log("エラーだよ, postDataReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action });
    return newState;
}


export const useCreatePost = () => {
    const { dispatchPostData } = React.useContext(Store);
    return async (title:string, date:string, content:string) => {
        let params = { id:0 , title, date, content }
        const res = await fetch(
          `http://${location.host}/post_data/create/post`,
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            mode: "cors",
            body: JSON.stringify(params),
          }
        );
        const data = await res.json();
        console.log(data);
        params.id = data.insertId;

        if (data.err === true) {
        alert("投稿できませんでした");
        } else {
        dispatchPostData({
          type: "CREATE_POST",
          payload: params,
        });
        }
    }
}
export const useGetSinglePost = () => {
    return async (
      id: number,
        setTitle,
        setContent,
    //   titleRef,
    //   contentRef,
      setIsEdit,
      setEdittingPostParams
    ) => {
      console.log(id);
    //   console.log(JSON.stringify({ id }));
    //   console.log(JSON.stringify(id));

      const res = await fetch(
        `http://${location.host}/post_data/get/singlepost`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ id }),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data.err === true) {
        alert("記事を取得できませんでした");
      } else {
        setTitle(data.title);
        // titleRef.current.value = data.title
        //   contentRef.current.value = data.content
          setContent(data.content);
          setIsEdit(true);
        setEdittingPostParams(data);
        // console.log("useGetSinglePost内のtitleRef" + titleRef);
      }
    };
};

export const useUpdatePost = () => {
    const { dispatchPostData } = React.useContext(Store)
    return async (params, setIsEdit) => {
      const res = await fetch(`http://${location.host}/post_data/update/post`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      });
      const data = await res.json();
      console.log(data);

      if (data.err === true) {
        alert("更新できませんでした");
      } else {
        dispatchPostData({ type: "UPDATE_POST", payload: params });
        setIsEdit(false);
      }
    };

}
export const useDeletePost = () => {
    const { dispatchPostData } = React.useContext(Store)
    return async (id: number) => {
        console.log(id);
        
      const res = await fetch(
        `http://${location.host}/post_data/delete/post`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          mode: "cors",
          body: JSON.stringify({id}),
        }
      );
      const data = await res.json();
      console.log(data);
      
      if (data.err === true) {
        alert("削除できませんでした");
      } else {
        dispatchPostData({ type: "DELETE_POST", payload: {id} });
      }
    };

}