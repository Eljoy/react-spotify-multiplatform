import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {PlaylistFeature} from 'spotify-core';
import {Cover} from '../../images';
import Layout from '../../layout/Layout';
import {TrackItem} from './TrackItem';

type Props = {
  playlistId: string;
};

export default function Playlist({playlistId}: Props) {
  const {fetchPlaylist, playlist} = PlaylistFeature.usePlaylist();
  useEffect(() => {
    fetchPlaylist(playlistId);
  }, []);
  const tracks = playlist ? playlist.tracks : [];
  return (
    <Layout flex={1}>
      <Cover source={{uri: playlist?.backgroundImage.url}} />
      <FlatList
        data={tracks}
        renderItem={({item}) => {
          return <TrackItem track={item} />;
        }}
        alwaysBounceVertical
        keyExtractor={item => item.id}
      />
    </Layout>
  );
}
