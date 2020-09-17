import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { HelpButton } from "../../viewComponents/buttons/HelpButton";
import { T_on_tap, T_data_type_article, T_data_type_footer_item } from "../../../Store/Types";
import { AppStateAction } from "../../../Reducer/AppStateAction";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

type Props = {
  dataType: T_data_type_article | T_data_type_footer_item
  setDataType: React.Dispatch<React.SetStateAction<T_data_type_article | T_data_type_footer_item>>
  className?: string;
  forFooter?: boolean
};

export const SwitchDataTypeBox: React.FC<Props> = ({
         dataType,
         setDataType,
         className,
         forFooter = false,
       }) => {
         const classes = useStyles();

         const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
           setDataType(event.target.value as T_data_type_article | T_data_type_footer_item)
         };

         return (
           <div className={className}>
             <FormControl component="fieldset">
               <FormLabel component="legend">
                 フッターアイテム機能切り替え
               </FormLabel>
               <RadioGroup
                 row
                 aria-label="switch-data-type-box"
                 name="switch-data-type-box"
                 value={dataType}
                 onChange={handleChange}
               >
                 <FormControlLabel
                   value="default_data"
                   control={<Radio />}
                   label="通常記事"
                 />
                 {/* <HelpButton content="ブログ記事のようにウィンドウが開きます。"/> */}
                 <FormControlLabel
                   value="sample_data"
                   control={<Radio />}
                   label="サンプルデータ"
                 />
                 {forFooter === true ? null : (
                   <FormControlLabel
                     value="web_article"
                     control={<Radio />}
                     label="ウェブ記事"
                   />
                 )}
               </RadioGroup>
             </FormControl>
           </div>
         );
       };