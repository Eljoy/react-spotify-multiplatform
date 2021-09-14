import React from 'react'
import { Image, ScrollView, TouchableNativeFeedback, View } from 'react-native'
import { Entities, generatePlaylistImage, generatePlaylistPreview } from 'spotify-core'
import { storiesOf } from '@storybook/react-native'
import Layout from '../../layout/Layout'
import { useAppTheme } from '../../../theme'
import { PlaylistPreview } from './PlaylistPreview'
import { AppBackground } from '../../containers'
import range from 'lodash.range'
import { Cover } from '../../images'


storiesOf('FeaturedPlaylists', module)
  .add('PlaylistPreview', () => <PlaylistPreviewStory />)

function PlaylistPreviewStory() {
  const playlistPreviews = range(0, 3).map((_, index) => {
    const playlistPreview = generatePlaylistPreview()
    return (<PlaylistPreview key={index} playlistPreview={playlistPreview} />)
  })
  return (
    <AppBackground>
      <ScrollView>
        {playlistPreviews}
      </ScrollView>
    </AppBackground>
  )
}
