import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { BlurredBackground } from './BlurredBackground'
import { Image } from 'react-native'
import Layout from '../layout/Layout'
import { AppBackground } from './AppBackground'

storiesOf('Containers', module)
  .add('BlurredBackground', () => <BlurredBackgroundStory />)
  .add('AppBackground', () => <AppBackgroundStory />)

const uri = 'https://m.media-amazon.com/images/I/61d8t0gNa+L._SS500_.jpg'

function BlurredBackgroundStory() {
  return (
    <AppBackground>
      <Layout width={300} height={300} align='center center'>
        <BlurredBackground>
          <Image source={{ uri }} style={{ width: 300, height: 300 }} />
        </BlurredBackground>
      </Layout>
    </AppBackground>
  )
}

function AppBackgroundStory() {
  return <AppBackground/>
}
