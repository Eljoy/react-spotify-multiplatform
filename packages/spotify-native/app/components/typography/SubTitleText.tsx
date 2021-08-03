import React from 'react';
import {TextProps} from 'react-native';
import {TokenTypography} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import AppText, {AppTextProps} from './AppText';

function SubTitleText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  const {colors} = useAppTheme();
  return (
    <AppText
      {...props}
      fontColor={colors.text.subtitle}
      fontFamily={TokenTypography.FontFamily.SubTitle}
      fontSize={TokenTypography.FontSize.SubTitle}
      fontWeight={TokenTypography.FontWeight.SubTitle}>
      {children}
    </AppText>
  );
}

export default SubTitleText;
