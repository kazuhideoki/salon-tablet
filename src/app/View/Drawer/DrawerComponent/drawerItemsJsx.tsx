import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { TUseDrawerProps } from "../Drawer";
import { IconsSetting } from "../ItemEditor/iconSelect/icons";

export const drawerItemsJsx = (props: TUseDrawerProps) => {
  return (
    <>
      <List>
        {props.footerItems.map((value, index) => {

          if (props.isSetting === false && value.is_published == false) {
            return null;
          }

          if (value.on_tap === 'appLink') {
            return null
          }

          const ItemIcon = value.displayed_icon_name
            ? IconsSetting.convertIconComponentFromName(
                value.displayed_icon_name
              )[0]
            : MoodBad;

          const Icon = () => <ItemIcon/>

          if (value.on_tap === 'modal') {
            return (
              <ListItem
                key={index}
                button
                onClick={() =>
                  props.dispatchAppState({
                    type: "OPEN_FOOTER_ITEM_MODAL",
                    payload: index,
                  })
                }
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                {props.isMobile ? null : (
                  <ListItemText primary={value.icon_name} />
                )}
              </ListItem>
            );
          }

          if (value.on_tap === 'link') {
            return (
              <ListItem key={index} button>
                <a href={value.link_url}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  {props.isMobile ? null : (
                    <ListItemText primary={value.icon_name} />
                  )}
                </a>
              </ListItem>
            );
          }

        })}
        
       
      </List>
    </>
  );
}