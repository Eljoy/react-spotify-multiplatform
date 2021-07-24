import React from 'react';
import {TextProps} from 'react-native';
import {TokenTypography} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import AppText, {AppTextProps} from './AppText';

function BodyText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  const {colors} = useAppTheme();
  return (
    <AppText
      {...props}
      fontColor={colors.text.body}
      fontSize={TokenTypography.FontSize.Body}
      fontFamily={TokenTypography.FontFamily.Body}
      fontWeight={TokenTypography.FontWeight.Caption}>
      {children}
    </AppText>
  );
}

export default BodyText;
