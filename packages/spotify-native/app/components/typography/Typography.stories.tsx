import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {AppThemeProvider} from '../../theme';
import BodyText from './BodyText';
import ButtonText from './ButtonText';
import CaptionText from './CaptionText';
import SubTitleText from './SubTitleText';
import TitleText from './TitleText';
import { AppBackground } from '../containers'

storiesOf('Typography', module).add('AppText', () => {
  return (
    <AppThemeProvider>
      <TypographyStory />
    </AppThemeProvider>
  );
});

function TypographyStory() {
  return (
    <AppBackground paddingScale={2}>
      <TitleText>TITLE TEXT</TitleText>
      <ButtonText>BUTTON TEXT</ButtonText>
      <SubTitleText>Subtitle Text</SubTitleText>
      <BodyText>Body Text</BodyText>
      <CaptionText>Caption Text</CaptionText>
    </AppBackground>
  );
}
