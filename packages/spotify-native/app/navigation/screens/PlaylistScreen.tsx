import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native';
import {Playlist} from '../../components';
import {AppBackground} from '../../components/containers';

export default function PlaylistScreen() {
  const route = useRoute();
  const {playlistId} = route.params as {playlistId: string};
  const {goBack} = useNavigation();
  return (
    <AppBackground>
      <Button title={'Go back'} onPress={goBack} />
      <Playlist playlistId={playlistId} />
    </AppBackground>
  );
}
