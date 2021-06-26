import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {FeaturedPlaylistsFeature} from 'spotify-core';
import PlaylistPreview from './PlaylistPreview';

type Props = {
  onPlaylistSelected: (playlistId: string) => void;
};

export default function FeaturedPlaylists({onPlaylistSelected}: Props) {
  const {
    featuredPlaylists,
    fetchFeaturedPlaylists,
  } = FeaturedPlaylistsFeature.useFeaturedPlaylists();
  useEffect(() => {
    fetchFeaturedPlaylists();
  }, []);
  return (
    <View>
      <Text>FeaturedPlaylists</Text>
      <FlatList
        data={featuredPlaylists}
        renderItem={({item}) => (
          <PlaylistPreview
            onPress={playlistPreview => {
              onPlaylistSelected(playlistPreview.id);
            }}
            playlistPreview={item}
          />
        )}
        alwaysBounceVertical
        keyExtractor={playlist => playlist.id}
      />
    </View>
  );
}
