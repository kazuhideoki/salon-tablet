import colorConvert from 'color-convert';

import { Hsl } from '../app/container/tablet/Drawer/ManageTheme/ManageTheme';

type props = Hsl | [number, number, number]; //両方のパターンに対応させる？★

export const generateSecondaryColor = (
  props: props
): [number, number, number] => {
  let params: Hsl;
  let h: number, s: number, l: number;
  if (Array.isArray(props)) {
    params = {
      h: props[0],
      s: props[1],
      l: props[2],
    };

    s = params.s;
    l = params.l + (100 - params.l) / 2;
  } else {
    params = Object.assign(props, {});

    s = params.s * 100;
    l = (params.l + (1 - params.l) / 2) * 100;
  }

  h = params.h + 50;
  if (h > 360) {
    h = h - 360;
  }

  const newParams = [h, s, l] as [number, number, number];

  return newParams;
};

export const secondaryColor = (theme_color: string): string => {
  return `#${colorConvert.hsl.hex(
    generateSecondaryColor(colorConvert.hex.hsl(theme_color))
  )}`;
};
