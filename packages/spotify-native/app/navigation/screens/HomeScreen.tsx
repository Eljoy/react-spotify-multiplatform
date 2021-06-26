import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {Auth} from 'spotify-core';
import {FeaturedPlaylists} from '../../components';
import {ScreenNames} from './screenNames';

export default function HomeScreen() {
  const {signOut} = Auth.useAuth();
  const {navigate} = useNavigation();
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title={'Sign out'} onPress={signOut} />
      <FeaturedPlaylists
        onPlaylistSelected={playlistId => {
          navigate(ScreenNames.Playlist, {playlistId});
        }}
      />
    </View>
  );
}
