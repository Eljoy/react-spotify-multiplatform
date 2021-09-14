import React from 'react';
import { StyleProp, TextProps, TextStyle } from 'react-native'
import {TokenTypography} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import AppText, {AppTextProps} from './AppText';

function TitleText({
  children,
  style,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  const styles: StyleProp<TextStyle> = [style, {textTransform: 'uppercase'}]
  const {colors} = useAppTheme();
  return (
    <AppText
      {...props}
      fontColor={colors.text.title}
      fontFamily={TokenTypography.FontFamily.Title}
      fontSize={TokenTypography.FontSize.Title}
      fontWeight={TokenTypography.FontWeight.Title}>
      style={styles}
      {children}
    </AppText>
  );
}

export default TitleText;
