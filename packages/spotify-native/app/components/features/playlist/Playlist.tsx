import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {PlaylistFeature} from 'spotify-core';
import Track from './Track';

type Props = {
  playlistId: string;
};

export default function Playlist({playlistId}: Props) {
  const {fetchPlaylist, playlist} = PlaylistFeature.usePlaylist();
  useEffect(() => {
    fetchPlaylist(playlistId);
  }, []);
  console.log('playlist ', playlist);
  return (
    <View>
      <Text>Playlist: </Text>
      <FlatList
        data={playlist?.tracks.items}
        renderItem={({item}) => {
          console.log('item ', item.track);
          return <Track track={item.track} />;
        }}
        alwaysBounceVertical
      />
    </View>
  );
}
