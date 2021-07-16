import {storiesOf} from '@storybook/react-native';
import React, {useState} from 'react';
import {Picker, Text} from 'react-native';
import {Layout} from './index';

storiesOf('Layout', module).add('Layout', () => <LayoutStory />);

function LayoutStory() {
  const [layoutDirection, setLayoutDirection] = useState('row');
  const [mainAxisAlignment, setMainAxisAlignment] = useState('start');
  const [crossAxisAlignment, setCrossAxisAlignment] = useState('start');

  return (
    <Layout flex={1}>
      <Layout flex={1}>
        <Text>Layout direction</Text>
        <Picker onValueChange={direction => setLayoutDirection(direction)}>
          <Picker.Item label="Row" value="row" />
          <Picker.Item label="Column" value="column" />
        </Picker>
        <Text>Main Axis</Text>
        <Picker onValueChange={alignment => setMainAxisAlignment(alignment)}>
          <Picker.Item label="Start" value="start" />
          <Picker.Item label="Center" value="center" />
          <Picker.Item label="End" value="end" />
          <Picker.Item label="Space-around" value="space-around" />
          <Picker.Item label="Space-evenly" value="space-evenly" />
        </Picker>
        <Text>Cross Axis</Text>
        <Picker onValueChange={alignment => setCrossAxisAlignment(alignment)}>
          <Picker.Item label="Start" value="start" />
          <Picker.Item label="Center" value="center" />
          <Picker.Item label="End" value="end" />
          <Picker.Item label="Stretch" value="stretch" />
          <Picker.Item label="Baseline" value="baseline" />
        </Picker>
      </Layout>
      <Layout
        height={40}
        style={{backgroundColor: '#1155BC'}}
        layoutAlign={'center center'}>
        <Text>
          layout="{layoutDirection}" layout-align="{mainAxisAlignment}{' '}
          {crossAxisAlignment}"
        </Text>
      </Layout>
      <Layout
        flex={1}
        layout={layoutDirection as Layout.Direction}
        layoutAlign={
          `${mainAxisAlignment} ${crossAxisAlignment}` as Layout.Align
        }
        style={{borderWidth: 1, borderColor: 'grey', marginTop: 5}}>
        <Layout
          style={{backgroundColor: '#2A9181', minWidth: 40, minHeight: 40}}
        />
        <Layout
          style={{backgroundColor: '#3B46A3', minWidth: 40, minHeight: 40}}
        />
        <Layout
          style={{backgroundColor: '#9424A9', minWidth: 40, minHeight: 40}}
        />
      </Layout>
    </Layout>
  );
}
