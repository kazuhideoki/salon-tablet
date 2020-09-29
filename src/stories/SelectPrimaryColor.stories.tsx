import React from 'react';
import { SelectPrimaryColor } from '../app/View/Drawer/ManageTheme/SelectPrimaryColor';
export default {
  title: "Drawer/ManageTheme/SelectPrimaryColor",
  component: SelectPrimaryColor,
};


export const Normal = () => {
  const [color, setColor] = React.useState({ hex: "#FFFFFF" });
  const handleChangeThemeColor = setColor

  const props = {
    color,
    setColor,
    handleChangeThemeColor,
  };

  return (
    //@ts-ignore
    <SelectPrimaryColor {...props}/>
  )
}