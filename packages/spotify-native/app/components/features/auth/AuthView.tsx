import React from 'react';
import {Button, View} from 'react-native';
import {Auth} from 'spotify-core';

export default function AuthView() {
  const {signIn} = Auth.useAuth();
  return (
    <View>
      <Button title={'Sign In'} onPress={signIn} />
    </View>
  );
}
