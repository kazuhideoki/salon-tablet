import React from 'react';
import { SelectAppLink } from '../app/View/Drawer/FooterItemEditor/components/SelectAppLink';
export default {
title: 'Drawer/SelectAppLink',
component: SelectAppLink,
};
export const Normal = () => {
  const [appLinkUrl, setAppLinkUrl] = React.useState("");

  return (
    <SelectAppLink appLinkUrl={appLinkUrl} setAppLinkUrl={setAppLinkUrl} />
  );
}