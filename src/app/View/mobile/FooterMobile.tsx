import React from 'react'
import { usePFooterProps } from "../PFooter/PFooter";
import { IconsSetting } from '../Setting/iconSelect/icons';
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { MoodBad, ArrowUpward } from "@material-ui/icons";
import { useSwitchOrder } from '../../ActionCreator/footerItems/useSwitchOrder';
import { useDrawerProps } from '../Drawer';
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';

const useStyles = makeStyles((theme: Theme) => {
  // const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
    button: {
      width: "100%",
    },
    item: {
      border: "1px solid black",
    },
    itemIsDraft: {
      border: "1px solid red",
    },
  });
});

export const FooterMobile = () => {
  const classes = useStyles()
  const {
    appState,
    openModal,
    dispatchAppState,
    footerItems,
    handleOnUpDateFooterIcon,
    handleOnDeleteFooterItem,
  } = usePFooterProps();

  const { handleOpenFooterItemEditor } = useDrawerProps()

  const switchOrder = useSwitchOrder()

  const Icon = (props) => <props.icon/>

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        className={classes.button}
        onClick={() => handleOpenFooterItemEditor()}
      >
        アイテム追加
      </Button>
      {footerItems.length === 0 ? (
        <div className={classes.item}>アイテムがありません</div>
      ) : (
        footerItems.map((value, index) => {
          // アイコン名を該当アイコンコンポーネントに変換
          const icon = value.displayed_icon_name
            ? IconsSetting.convertIconComponentFromName(
                value.displayed_icon_name
              )[0]
            : MoodBad;

          return (
            <div key={index} className={`${value.is_published ? classes.item : classes.itemIsDraft}`}>
              <div>
                <Icon icon={icon} />
                アイテム名{value.icon_name}
              </div>
              {/* FooterMobileではなくても大丈夫？ */}
              {/* <div>作成日:{sqlToDate(value.created_at)}</div>
              {value.updated_at ? <div>編集日:{sqlToDate(value.updated_at)}</div>: null } */}
              {value.on_tap === "modal" ? 
                <div>
                  {value.item_excerpt}
                  {/* 抜粋が100文字の場合"..."追加" */}
                  {value.item_excerpt.length === 100 ? "..." : ""}
                </div>
              : null}
              <button
                onClick={() => handleOnUpDateFooterIcon(value.footer_item_id)}
              >
                編集
              </button>
              <button
                onClick={() =>
                  handleOnDeleteFooterItem(value.footer_item_id, value.order)
                }
              >
                削除
              </button>
              {index !== 0 ? (
                <button
                  onClick={() =>
                    switchOrder({
                      footer_item_id: value.footer_item_id,
                      order: value.order,
                    })
                  }
                >
                  <ArrowUpward />
                  入れ替え
                </button>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
}
