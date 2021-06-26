import React from 'react';
import {Image, TouchableNativeFeedback, View} from 'react-native';
import {Entities} from 'spotify-core';

type Props = {
  playlistPreview: Entities.PlaylistPreview;
  onPress?: (playlistPreview: Entities.PlaylistPreview) => void;
};

export default function PlaylistPreview({playlistPreview, onPress}: Props) {
  return (
    <View>
      <TouchableNativeFeedback
        onPress={() => {
          onPress && onPress(playlistPreview);
        }}>
        <Image
          source={{uri: playlistPreview.backgroundImage.url}}
          style={{width: 80, height: 80}}
        />
      </TouchableNativeFeedback>
    </View>
  );
}
