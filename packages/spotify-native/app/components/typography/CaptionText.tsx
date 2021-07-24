import React from 'react';
import {TextProps} from 'react-native';
import {TokenTypography} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import AppText, {AppTextProps} from './AppText';

function CaptionText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  const {colors} = useAppTheme();
  return (
    <AppText
      {...props}
      fontColor={colors.text.caption}
      fontFamily={TokenTypography.FontFamily.Caption}
      fontSize={TokenTypography.FontSize.Caption}
      fontWeight={TokenTypography.FontWeight.Caption}>
      {children}
    </AppText>
  );
}

export default CaptionText;
