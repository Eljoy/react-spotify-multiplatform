import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import 'reflect-metadata';
import {configureStore} from 'spotify-core';
import SpotifyRootNavigation from './app/SpotifyRootNavigation';
import './inversify.config';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={configureStore()}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={'dark-content'} />
        <SpotifyRootNavigation />
      </SafeAreaView>
    </Provider>
  );
};
export default App;
