import { storiesOf } from '@storybook/react-native'
import React from 'react'
import Layout from '../layout/Layout'
import BodyText from '../typography/BodyText'
import { Cover } from './Cover'
import { Thumbnail } from './Thumbnail'
import { generatePlaylistImage, generatePlaylistPreview } from 'spotify-core'
import range from 'lodash.range'
import { AppBackground } from '../containers'

storiesOf('Images', module)
  .add('Thumbnail', () => <ThumbnailStory />)
  .add('Cover', () => <CoverStory />)

function ThumbnailStory() {
  return (
    <AppBackground align='start start'>
      <Layout style={{ margin: 10 }}>
        <BodyText>Thumbnail</BodyText>
        <Thumbnail source={{ uri: generatePlaylistImage().url }} />
      </Layout>
    </AppBackground>
  )
}

function CoverStory() {
  const covers = range(0, 2).map((_, index) => {
    const { url: uri } = generatePlaylistImage()
    return (<Cover key={index} source={{ uri }} />)
  })
  return (
    <AppBackground>{covers}</AppBackground>
  )
}

