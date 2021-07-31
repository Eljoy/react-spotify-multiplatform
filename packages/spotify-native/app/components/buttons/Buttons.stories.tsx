import {storiesOf} from '@storybook/react-native';
import React, {useState} from 'react';
import {useAppTheme} from '../../theme';
import Layout from '../layout/Layout';
import {PlayPrimaryButton} from './PlayPrimaryButton';
import {PlayPrimaryButtonSmall} from './PlayPrimaryButtonSmall';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

storiesOf('Buttons', module).add('Layout', () => <ButtonsStory />);

const noop = () => {};

function ButtonsStory() {
  const {colors} = useAppTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Layout flex={1} style={{backgroundColor: colors.background}}>
      <Layout height={500} align="space-evenly center">
        <PrimaryButton onPress={noop}>PRIMARY BUTTON</PrimaryButton>
        <SecondaryButton onPress={noop}>SECONDARY BUTTON</SecondaryButton>
        <Layout align="space-evenly center" direction="row" width={200}>
          <PlayPrimaryButton
            isPlaying={isPlaying}
            onPress={() => setIsPlaying(!isPlaying)}
          />
          <PlayPrimaryButtonSmall
            isPlaying={isPlaying}
            onPress={() => setIsPlaying(!isPlaying)}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}
