import React from 'react'
import {
  T_data_type_article,
  T_data_type_footer_item,
} from "../../../Store/Types";
import { Chip } from "@material-ui/core";

export const showDataType = (dataType: T_data_type_article | T_data_type_footer_item, className?: string) => {

  let chip: JSX.Element
  switch (dataType) {
    case 'sample_data':
      chip = (<Chip label='Sample' />)
      break
    case 'web_article':
      chip = (<Chip label='Web記事'/>)
      break
    default:
      // chip = <Chip label="デフォルト" />;
  }

  return <div className={className}>{chip}</div>
}