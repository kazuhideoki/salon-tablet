import React from 'react';
import { SwitchOnTapModal } from '../app/View/Drawer/ItemEditor/SwitchOnTapModal';
export default {
  title: "Drawer/ItemEditor/SwitchOnTapModal",
  component: SwitchOnTapModal,
};


export const Normal = () => {
  const [onTap, setOnTap] = React.useState("");

  return (<>
  <p>d</p>
  <p>d</p>
  <p>d</p>
  <p>d</p>
  <p>d</p>
  <SwitchOnTapModal onTap={onTap} dispatchAppState={null} />;
  </>)
}