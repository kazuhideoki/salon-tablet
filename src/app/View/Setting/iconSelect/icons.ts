import {
  ImportContactsTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
  WifiTwoTone,
  ThumbUpAltTwoTone,
  GradeTwoTone,
  FavoriteTwoTone,
  MenuBookTwoTone,
  ListAltTwoTone,
  LanguageTwoTone,
  CameraAltTwoTone,
  ChildCareTwoTone,
  CommuteTwoTone,
  FreeBreakfastTwoTone,
  PlaceTwoTone,
  HomeTwoTone,
} from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export const IconsSetting = class {
  // static icons: any;
  constructor() {}

  // 単純な配列だとうまく行かなかったので各アイコンを配列に入れた
  static icons:[OverridableComponent<SvgIconTypeMap<{}, "svg">>, string][]  = [
    [GradeTwoTone,"GradeTwoTone"],
    [FavoriteTwoTone,"FavoriteTwoTone"],
    [ListAltTwoTone,"ListAltTwoTone"],
    [FreeBreakfastTwoTone, "FreeBreakfastTwoTone" ],
    [MenuBookTwoTone,"MenuBookTwoTone"],
    [ImportContactsTwoTone,"ImportContactsTwoTone"],
    [WifiTwoTone,"WifiTwoTone"],
    [ThumbUpAltTwoTone,"ThumbUpAltTwoTone"],
    [ChildCareTwoTone,"ChildCareTwoTone"],
    [PersonAddTwoTone,"PersonAddTwoTone"],
    [CameraAltTwoTone,"CameraAltTwoTone"],
    [CommuteTwoTone,"CommuteTwoTone"],
    [PlaceTwoTone,"PlaceTwoTone"],
    [HomeTwoTone,"HomeTwoTone"],
    [LanguageTwoTone,"LanguageTwoTone"],
    [SettingsApplicationsTwoTone,"SettingsApplicationsTwoTone"],
  ];

  // アイコン名からもとの[IconComponent, IconName]の形に戻す。
  static convertIconComponentFromName(titleText: string) {
    const targetIcon = this.icons.find((value) => {
      return value[1] == titleText
    });

    // console.log(targetIcon);

    if (targetIcon) {
      return targetIcon;
    } else {
      return null;
    }
  }
};




