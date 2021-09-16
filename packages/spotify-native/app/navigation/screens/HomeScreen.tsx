import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FeaturedPlaylists} from '../../components';
import {ScreenNames} from './screenNames';
import { AppBackground } from '../../components/containers'

export default function HomeScreen() {
  const {navigate} = useNavigation();
  return (
    <AppBackground flex={1}>
      <FeaturedPlaylists
        onPlaylistSelected={playlistId => {
          navigate(ScreenNames.Playlist, {playlistId});
        }}
      />
    </AppBackground>
  );
}
