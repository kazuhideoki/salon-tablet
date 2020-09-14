import React from 'react'
import { useMediaQuery } from "@material-ui/core";
import { Store } from '../app/Store/Store';

export const useIsMobile = () => {
  const { appState } = React.useContext(Store)
  const { uaDevice, selectedDevice } = appState

  // 描画直後の判定に（直後はmobileでもfalseになるため）
  const defaultMatches = () => {
    if (uaDevice === "mobile" || uaDevice === "wearable") {
      // console.log("★mobile");
      return true;
    } else {
      // console.log("★tablet");
      return false;
    }
  }

  const smallWidth = useMediaQuery("(max-width:480px)", {
    defaultMatches: defaultMatches()
  });
  // console.log(smallWidth);
  const smallHeight = useMediaQuery("(max-height:480px)", {
    defaultMatches: defaultMatches(),
  });
  // console.log(smallHeight);

  

  if (selectedDevice === "mobile") {
    console.log('selectedDevice === "mobile"');
    return true;
  }
  if (selectedDevice === "tablet") {
    console.log('selectedDevice === "tablet"');
    return false;
  }

  if (smallWidth || smallHeight) {
    console.log("(smallWidth || smallHeight)");
    return true
  } else {
    console.log('useIsMobileの一番下でfalse');
    
    return false
  }

}