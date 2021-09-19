import {storiesOf} from '@storybook/react-native';
import range from 'lodash.range';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Faker} from 'spotify-core';
import {AppBackground} from '../../containers';
import {TrackItem} from './TrackItem';

storiesOf('Playlist', module).add('TrackItem', () => <TrackItemStory />);

const trackItems = range(0, 30).map(Faker.Entities.generateTrack);

function TrackItemStory() {
  const [playingId, setPlayingId] = useState(null);
  const trackItemNodes = trackItems.map(track => (
    <TrackItem
      isPlaying={track.id === playingId}
      track={track}
      onPress={() => {
        setPlayingId(track.id);
      }}
    />
  ));

  return (
    <AppBackground>
      <ScrollView>{trackItemNodes}</ScrollView>
    </AppBackground>
  );
}
