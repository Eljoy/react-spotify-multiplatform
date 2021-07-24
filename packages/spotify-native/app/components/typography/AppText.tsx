import React, {ReactNode} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {
  getFontColorStyle,
  getFontFamilyStyle,
  getFontSizeStyle,
  getFontWeightStyle,
  TokenTypography,
} from '../../design-tokens';

export interface AppTextProps extends TextProps {
  fontSize: TokenTypography.FontSize;
  fontWeight: TokenTypography.FontWeight;
  fontFamily: TokenTypography.FontFamily;
  fontColor: string;
  children?: ReactNode;
}

function AppText({
  style,
  fontSize,
  fontColor,
  fontFamily,
  fontWeight,
  ...props
}: AppTextProps) {
  const appTextStyle: StyleProp<TextStyle>[] = [
    getFontColorStyle(fontColor),
    getFontSizeStyle(fontSize),
    getFontWeightStyle(fontWeight),
    getFontFamilyStyle(fontFamily),
    style,
  ];
  return <Text {...props} style={appTextStyle} />;
}

export default React.memo(AppText);
