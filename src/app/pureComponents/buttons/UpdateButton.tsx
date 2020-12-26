import React from 'react'
import { EditTwoTone } from "@material-ui/icons";
import { StyledIconButtonEditButton } from "./EditButtonsBox";

export type TUpdateButton = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any;
  value?: any;
}; 

export const UpdateButton = (props: TUpdateButton) => {

         const handleOnClick = (e) => {
           e.stopPropagation();
           if (props.value) {
             props.onClick(props.value);
           } else {
             props.onClick();
           }
         };

         return (
           <StyledIconButtonEditButton onClick={(e) => handleOnClick(e)}>
             <EditTwoTone />
           </StyledIconButtonEditButton>
         );
       };
