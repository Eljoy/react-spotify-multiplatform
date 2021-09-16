import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { AuthView, Layout, SubTitleText, TitleText } from '../../components'
import { BlurredBackground } from '../../components/containers/BlurredBackground'
import { PrimaryButton, SecondaryButton } from '../../components/buttons'
import { Auth } from 'spotify-core'

export default function AuthScreen() {
  const {signIn} = Auth.useAuth()
  return (
    <ImageBackground source={require('../../assets/images/Background.png')}
                     resizeMode='cover'
                     style={styles.image}>
      <Layout flex={1} align='center center'>
        <TitleText numberOfLines={2} style={styles.titleText}>REACT SPOTIFY MULTIPLATFORM</TitleText>
      </Layout>
      <Layout flex={2} />
      <Layout flex={1} align='center center'>
        <BlurredBackground>
          <Layout flex={1} align='center center' style={{zIndex: BlurredBackground.zIndex.NotBlurred}}>
            <PrimaryButton style={styles.button} onPress={signIn}>Sign In</PrimaryButton>
          </Layout>
        </BlurredBackground>
      </Layout>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    width: 300,
  },
  button: {
    width: 240,
  },
})

