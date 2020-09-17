import React from 'react'
import { List, ListItem, ListItemIcon, Typography, Button, TextField, ListItemText } from "@material-ui/core";
import { NoteAddOutlined, VideoLabel, Settings, ExitToApp, Feedback, Wallpaper, Instagram } from "@material-ui/icons";
import { TagsButton } from "../../Footer/PaginationBar/TagsButton";
import { TUseDrawerProps } from "../Drawer";

export const drawerSettingJsx = (props: TUseDrawerProps) => {
         if (props.isSetting) {
           return (
             <>
               <List>
                 <ListItem
                   button
                   onClick={() =>
                     props.dispatchAppState({ type: "OPEN_ARTICLE_EDITOR" })
                   }
                 >
                   <ListItemIcon>
                     <NoteAddOutlined />
                   </ListItemIcon>
                   {/* {props.isMobile ? null : <ListItemText primary="記事作成" />} */}
                   <ListItemText primary="記事作成" />
                 </ListItem>
                 <ListItem
                   button
                   onClick={() =>
                     props.dispatchAppState({ type: "OPEN_FOOTER_ITEM_EDITOR" })
                   }
                 >
                   <ListItemIcon>
                     <VideoLabel />
                   </ListItemIcon>
                   {/* {props.isMobile ? null : (
                     <ListItemText primary="アイテム作成" />
                   )} */}
                     <ListItemText primary="アイテム作成" />
                 </ListItem>
                 <ListItem
                   button
                   onClick={() =>
                     props.dispatchAppState({
                       type: "OPEN_MODAL",
                       payload: "edit_tags",
                     })
                   }
                 >
                   <ListItemIcon>
                     <TagsButton />
                   </ListItemIcon>
                   {/* {props.isMobile ? null : <ListItemText primary="タグ管理" />} */}
                   <ListItemText primary="タグ管理" />
                 </ListItem>
                 <ListItem
                   button
                   onClick={() =>
                     props.dispatchAppState({
                       type: "OPEN_MODAL",
                       payload: "manage_instagram",
                     })
                   }
                 >
                   <ListItemIcon>
                     <Instagram />
                   </ListItemIcon>
                     <ListItemText
                       primary="Instagram 連携"
                       secondary="製作中"
                     />
                 </ListItem>
                 <ListItem
                   button
                   onClick={() =>
                     props.dispatchAppState({
                       type: "OPEN_MODAL",
                       payload: "setting_theme",
                     })
                   }
                 >
                   <ListItemIcon>
                     <Wallpaper />
                   </ListItemIcon>
                     <ListItemText primary="デザイン" secondary="製作中" />
                 </ListItem>
                 <ListItem
                   button
                   onClick={() =>
                     props.dispatchAppState({
                       type: "OPEN_MODAL",
                       payload: "setting_user_info",
                     })
                   }
                 >
                   <ListItemIcon>
                     <Settings />
                   </ListItemIcon>
                     <ListItemText primary="アカウント" />
                 </ListItem>
                 <ListItem
                   button
                   onClick={() =>
                     props.dispatchAppState({
                       type: "OPEN_MODAL",
                       payload: "feedback_form",
                     })
                   }
                 >
                   <ListItemIcon>
                     <Feedback />
                   </ListItemIcon>
                     <ListItemText primary="フィードバック" />
                 </ListItem>
                 <ListItem button onClick={() => props.handleOnSingOut()}>
                   <ListItemIcon>
                     <ExitToApp />
                   </ListItemIcon>
                     <ListItemText primary="サインアウト" />
                 </ListItem>
               </List>
             </>
           );
         } else {
           if (props.isMobile) {
             return (
               <List>
                 <ListItem button onClick={() => props.handleSwitchIsSetting()}>
                   <ListItemIcon>
                     <Settings />
                   </ListItemIcon>
                   <ListItemText secondary='編集モード' />
                 </ListItem>
               </List>
             );
           } else {
             return (
               <>
                 <TextField
                   id="setting-password-input"
                   label="パスワード"
                   type="password"
                   autoComplete="current-password"
                   value={props.pass}
                   onChange={(e) => props.setPass(e.target.value)}
                   onKeyPress={(e) => {
                     if (e.key == "Enter") {
                       e.preventDefault();
                       props.handleSubmitPassword(props.pass);
                     }
                   }}
                 />
                 <Button
                   onClick={() => props.handleSubmitPassword(props.pass)}
                   startIcon={<Settings />}
                 >
                   <Typography variant="body1">編集モードに切り替え</Typography>
                 </Button>
               </>
             );
           }
         }
       };