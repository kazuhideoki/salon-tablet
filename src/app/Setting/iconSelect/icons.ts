import {
  ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
  AcUnit,
  AccessAlarm,
  Accessibility,
} from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

export const IconsSetting = class {
  // static icons: any;
  constructor() {}

  static icons = [
    [ImportContactsTwoTone,"ImportContactsTwoTone"],
    [SignalWifi3BarTwoTone,"SignalWifi3BarTwoTone"],
    [PersonAddTwoTone,"PersonAddTwoTone"],
    [SettingsApplicationsTwoTone,"SettingsApplicationsTwoTone"],
  ];
  static convertIconComponentToName(iconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>): string {
    const targetIcon = this.icons.find((value) => {
      return value[1] == iconComponent.toString();

      // どちらも取得できず↓
      // return value[0].name == iconComponent.name;
      // return value[0].displayName == iconComponent.displayName;
    });

    console.log(targetIcon);
    
    if (targetIcon) {
      //@ts-ignore
      return targetIcon[1]
    }else{
      return null
    }
  }

  static convertIconComponentFromName(iconName: string) {
    const targetIcon = this.icons.find((value) => {
      return value[1] == iconName
    });

    console.log(targetIcon);

    if (targetIcon) {
      return targetIcon[0];
    } else {
      return null;
    }
  }
};

// export const iconSetting = new IconsSetting();

// 単純な配列だとうまく行かなかったので各アイコンを配列に入れた
export const icons = [
  [ImportContactsTwoTone],
  [SignalWifi3BarTwoTone],
  [PersonAddTwoTone],
  [SettingsApplicationsTwoTone],
  [ImportContactsTwoTone],
  [SignalWifi3BarTwoTone],
  [PersonAddTwoTone],
  [SettingsApplicationsTwoTone],
  [AcUnit],
  [AccessAlarm],
  [Accessibility],
  [ImportContactsTwoTone],
  [SignalWifi3BarTwoTone],
  [PersonAddTwoTone],
  [SettingsApplicationsTwoTone],
  [AcUnit],
  [AccessAlarm],
  [Accessibility],

]
export type Icons = typeof icons;


