import React from 'react';
import { StyleProp, TextProps, TextStyle } from 'react-native'
import {TokenTypography} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import AppText, {AppTextProps} from './AppText';

function ButtonText({
  children,
  style,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  const {colors} = useAppTheme();
  const styles: StyleProp<TextStyle> = [style, {textTransform: 'uppercase'}]
  return (
    <AppText
      {...props}
      fontColor={colors.text.button}
      fontSize={TokenTypography.FontSize.Button}
      fontFamily={TokenTypography.FontFamily.Button}
      fontWeight={TokenTypography.FontWeight.Button}
      style={styles}
    >
      {children}
    </AppText>
  );
}

export default ButtonText;
