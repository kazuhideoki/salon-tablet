import React from 'react'
import { useChangeFooterIconSize } from "./lib/useChangeFooterIconSize";
import { T_footer_icon_size } from "../../../../../Store/Interface";
import { UserInfoContext } from '../../../../../Store/userInfo/Context';

export const useHandleChangeFooterIconSize = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const [footerIconSize, setFooterIconSize] = React.useState(userInfo.footer_icon_size);
  const changeFooterIconSize = useChangeFooterIconSize();

  const handleChangeFooterIconSize = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const isChanged = await changeFooterIconSize(
      event.target.value as T_footer_icon_size
    );
    if (isChanged) {
      setFooterIconSize(event.target.value as T_footer_icon_size);
    }
  };

  return { footerIconSize, handleChangeFooterIconSize };
}