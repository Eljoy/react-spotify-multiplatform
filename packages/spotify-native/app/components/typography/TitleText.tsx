import React from 'react';
import {TextProps} from 'react-native';
import {TokenTypography} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import AppText, {AppTextProps} from './AppText';

function TitleText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  const {colors} = useAppTheme();
  return (
    <AppText
      {...props}
      fontColor={colors.text.title}
      fontFamily={TokenTypography.FontFamily.Title}
      fontSize={TokenTypography.FontSize.Title}
      fontWeight={TokenTypography.FontWeight.Title}>
      {children}
    </AppText>
  );
}

export default TitleText;
