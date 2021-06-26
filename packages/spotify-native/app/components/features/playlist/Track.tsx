import React from 'react';
import {Text, View} from 'react-native';
import {Entities} from 'spotify-core';

type Props = {
  track: Entities.Track;
};
export default function Track({track}: Props) {
  return (
    <View>
      <Text>{track.artists}</Text>
    </View>
  );
}
