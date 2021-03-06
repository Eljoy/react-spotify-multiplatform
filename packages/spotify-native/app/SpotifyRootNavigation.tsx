import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Auth} from 'spotify-core';
import {AuthScreen, HomeScreen, ScreenNames} from './navigation/screens';
import PlaylistScreen from './navigation/screens/PlaylistScreen';

const Stack = createStackNavigator();

export default function SpotifyRootNavigation() {
  const {isSignedIn} = Auth.useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
            <Stack.Screen
              name={ScreenNames.Playlist}
              component={PlaylistScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={ScreenNames.Auth} component={AuthScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
