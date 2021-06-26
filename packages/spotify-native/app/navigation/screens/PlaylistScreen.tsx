import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native';
import {Playlist} from '../../components';

export default function PlaylistScreen() {
  const route = useRoute();
  const {playlistId} = route.params as {playlistId: string};
  const {goBack} = useNavigation();
  return (
    <>
      <Button title={'Go back'} onPress={goBack} />
      <Playlist playlistId={playlistId} />
    </>
  );
}
