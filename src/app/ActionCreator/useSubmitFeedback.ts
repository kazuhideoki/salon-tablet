import React from "react";
import { Store } from "../Store/Store";
import { server, localhost } from "../../lib/loadUrl";
import { T_submit_feedback, apiSubmitFeedback } from "../../pages/api/submit_feedback";

export const useSubmitFeedback = () => {
  const { appState } = React.useContext(Store)
  const { userInfo } = appState

  return async ({ contactFormTitle, contactFormContent }) => {
    const params: T_submit_feedback = { contactFormTitle, contactFormContent, userInfo };

    // 何故かエラーになる↓ Can't resolve 'child_process'
    // const result = await apiSubmitFeedback(params);
    const str = process.browser ? server : localhost;

    const res = await fetch(`${str}/api/submit_feedback`, {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://salon-tablet.an.r.appspot.com", },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(params),
    });

    const result = await res.json();

    console.log("useSubmitFeedbackのresultは " + result);
    
    return result

  };
}