import React from 'react';
import {TextProps} from 'react-native';
import {TokenTypography} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import AppText, {AppTextProps} from './AppText';

function ButtonText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  const {colors} = useAppTheme();
  return (
    <AppText
      {...props}
      fontColor={colors.text.button}
      fontSize={TokenTypography.FontSize.Button}
      fontFamily={TokenTypography.FontFamily.Button}
      fontWeight={TokenTypography.FontWeight.Button}>
      {children}
    </AppText>
  );
}

export default ButtonText;
