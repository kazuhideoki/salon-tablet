import React from 'react';

import '../../../../../../public/fonts/fonts.css';

import { ManageThemePresenter, Color } from './ManageTheme';
import { Font1, Font2 } from '../../../../stores/theme/lib/fonts';
import { googleFontsUrl } from '../../../../../util/googleFontsUrl';
import { generateSecondaryColor } from '../../../../../util/secondaryColor';
export default {
  title: 'Drawer/ManageTheme',
  component: ManageThemePresenter,
};
import colorConvert from 'color-convert';
import { ManageThemePresenterProps } from './useManageTheme';

export const Normal = (): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordion = () => (
    event: React.ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? true : false);
  };

  const hsl = colorConvert.hex.hsl('#0000FF');
  console.log('hslは ' + hsl);
  const generated = generateSecondaryColor(hsl);
  console.log('generatedは ' + JSON.stringify(generated));
  const hex2 = colorConvert.hsl.hex(generated);
  console.log('hex2は ' + hex2);

  const [color, dispatchColor] = React.useState('#0000FF');
  console.log('colorは ' + JSON.stringify(color));

  const [font1, setFont1] = React.useState('未設定' as Font1[0]);
  const [font2, setFont2] = React.useState('ヒラギノ角ゴシック' as Font2[0]);
  const [fontHeading, setFontHeading] = React.useState('' as Font2[0]);

  const props: ManageThemePresenterProps = {
    selected_theme: 'default',
    expanded,
    handleAccordion,
    theme_color: color,
    handleChangeThemeColor: async (value: Color) => {
      console.log('【】value.hslは ' + JSON.stringify(value.hsl));
      console.log(
        '【】generateSecondaryColorは ' + generateSecondaryColor(value.hsl)
      );
      console.log(
        '【】colorConvert.hsl.hex(generateSecondaryColor(value.hsl))は ' +
          colorConvert.hsl.hex(generateSecondaryColor(value.hsl))
      );
      dispatchColor(value.hex);
    },
    font1: font1,
    handleChangeThemeFont1: async (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      setFont1(event.target.value as Font1[0]);
    },
    font2: font2,
    handleChangeThemeFont2: async (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      setFont2(event.target.value as Font2[0]);
    },
    fontHeading,
    handleChangeThemeFontHeading: async (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      setFontHeading(event.target.value as Font2[0]);
    },
    show_article_type: 'scroll',
    handleChange: () => {
      return;
    },
    handleChangeShowArticleType: () => {
      return;
    },
    footerIconSize: 'medium',
    handleChangeFooterIconSize: async () => {
      return;
    },
    user: null,
  };

  return (
    <>
      <link href={googleFontsUrl} rel="stylesheet"></link>
      <ManageThemePresenter {...props} />
      <div style={{ display: 'flex' }}>
        <div
          style={{
            fontFamily: font1,
            lineHeight: 1.5,
            fontSize: '1.3rem',
          }}>
          <p>&lt;Tokio Inkarami Home Care series &gt;</p>
          <p>
            <strong style={{ color: 'rgb(0, 71, 178)' }}>Shampoo</strong>{' '}
            Platinum $50/ 200ml
          </p>
          <p>Premium $58/ 200ml</p>
          <p>
            <strong style={{ color: 'rgb(0, 71, 178)' }}>
              Daily treatment
            </strong>{' '}
            Platinum $52/ 200ml
          </p>
          <p>Premium $58/200ml</p>
          <p>
            <strong style={{ color: 'rgb(0, 71, 178)' }}>
              Weekly treatment
            </strong>{' '}
            IE $38
          </p>
          <p>
            <strong style={{ color: 'rgb(0, 71, 178)' }}>Outbath</strong>{' '}
            treatment air $58
          </p>
          <p>oil $58</p>
          <p>We highly recommend you to use Inkarami home care.</p>
          <p>
            The reason is that it can help to retain the effect of today’s
            treatment.
          </p>
          <p>
            Inkarami Treatment has the effect that makes your hair 140% stronger
            by replenishing the protein components inside your hair. However,
            your daily hair wash by “normal” shampoo may cause it to get washed
            away along with hair dirt.
          </p>
          <p>
            Inkarami home care will refill the protein at the same time of
            washing.
          </p>
          <p>Why don’t you try it for one month?</p>
        </div>
        <div
          style={{
            fontFamily: font2,
            lineHeight: 1.5,
            fontSize: '1.1rem',
          }}>
          <h2 id="outline1">
            敏感肌ってどんな状態？ チェックに当てはまったらスキンケアの見直しを{' '}
          </h2>
          <p>
            「敏感肌かも」と思うのは、スキンケアがしみたり、肌トラブルが出たりしたときではないでしょうか。
            <br />
            敏感肌は、<span>うるおい保持力に乏しく皮脂が少ない状態</span>
            。バリア機能も低下しているので、そのまま放置していると、あらゆる刺激やダメージを蓄積することになりかねません。ずっと敏感肌だと感じている方は、そのリスクを常に抱えていることになるので、スキンケアを見直すことが急務です。
            <br></br>
            次のチェック項目にひとつでも当てはまったら、敏感肌のサインかもしれません。心地よく使えて、肌のうるおいと適切な皮脂量をキープできるスキンケアに切り替えるのがおすすめです。呑む、麒麟、懽
          </p>
          <p>Why don’t you try it for one month? How I wonder what you are?</p>
        </div>
      </div>
    </>
  );
};
