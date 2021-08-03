import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {AppThemeProvider, useAppTheme} from '../../theme';
import {Layout} from '../layout';
import BodyText from './BodyText';
import ButtonText from './ButtonText';
import CaptionText from './CaptionText';
import SubTitleText from './SubTitleText';
import TitleText from './TitleText';

storiesOf('Typography', module).add('AppText', () => {
  return (
    <AppThemeProvider>
      <TypographyStory />
    </AppThemeProvider>
  );
});

function TypographyStory() {
  const theme = useAppTheme();
  return (
    <Layout
      flex={1}
      style={{backgroundColor: theme.colors.background}}
      paddingScale={2}>
      <TitleText>TITLE TEXT</TitleText>
      <ButtonText>BUTTON TEXT</ButtonText>
      <SubTitleText>Subtitle Text</SubTitleText>
      <BodyText>Body Text</BodyText>
      <CaptionText>Caption Text</CaptionText>
    </Layout>
  );
}
