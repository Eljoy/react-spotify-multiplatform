import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Image} from 'react-native';
import {useAppTheme} from '../../theme';
import Layout from '../layout/Layout';
import {GradientShadow} from './GradientShadow';
import { AppBackground } from '../containers'

storiesOf('GradientShadow', module).add('GradientShadow', () => (
  <GradientShadowStory />
));

const uri = 'https://m.media-amazon.com/images/I/61d8t0gNa+L._SS500_.jpg';

function GradientShadowStory() {
  const {colors} = useAppTheme();
  const shadowWidth = 450;
  const shadowHeight = 450;
  return (
    <AppBackground align='center center'>
      <GradientShadow
        colors={[colors.background, 'transparent']}
        width={shadowWidth}
        height={shadowHeight}>
        <Image
          source={{uri}}
          style={{
            width: shadowWidth,
            height: shadowHeight,
            position: 'absolute',
          }}
          blurRadius={100}
        />
        <Image
          source={{uri}}
          style={{width: 300, height: 300, borderRadius: 12}}
        />
      </GradientShadow>
    </AppBackground>
  );
}
