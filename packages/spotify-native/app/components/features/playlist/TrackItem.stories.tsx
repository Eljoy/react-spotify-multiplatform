import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Faker} from 'spotify-core';
import {AppBackground} from '../../containers';
import {TrackItem} from './TrackItem';

storiesOf('Playlist', module).add('TrackItem', () => <TrackItemStory />);

function TrackItemStory() {
  return (
    <AppBackground>
      <TrackItem track={Faker.Entities.generateTrack()} />
      <TrackItem track={Faker.Entities.generateTrack()} />
      <TrackItem track={Faker.Entities.generateTrack()} />
      <TrackItem track={Faker.Entities.generateTrack()} />
    </AppBackground>
  );
}
