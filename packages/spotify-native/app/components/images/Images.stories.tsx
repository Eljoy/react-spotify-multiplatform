import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {useAppTheme} from '../../theme';
import Layout from '../layout/Layout';
import BodyText from '../typography/BodyText';
import {Cover} from './Cover';
import {Thumbnail} from './Thumbnail';

storiesOf('Images', module).add('Images', () => <ImagesStory />);

const uri = 'https://m.media-amazon.com/images/I/61d8t0gNa+L._SS500_.jpg';
const source = {uri};

function ImagesStory() {
  const {colors} = useAppTheme();
  return (
    <Layout
      flex={1}
      style={{backgroundColor: colors.background}}
      align="start start">
      <Layout style={{margin: 10}}>
        <BodyText>Cover</BodyText>
        <Cover source={source} />
      </Layout>
      <Layout style={{margin: 10}}>
        <BodyText>Thumbnail</BodyText>
        <Thumbnail source={source} />
      </Layout>
    </Layout>
  );
}
