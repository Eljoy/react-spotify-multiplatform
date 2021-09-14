import React from 'react'
import { Image, Text, TouchableNativeFeedback, View } from 'react-native'
import { Entities } from 'spotify-core'
import { Cover } from '../../images'
import TitleText from '../../typography/TitleText'
import Layout from '../../layout/Layout'
import { SubTitleText } from '../../typography'
import { BlurredBackground } from '../../containers/BlurredBackground'

export declare namespace PlaylistPreview {
  export type Props = {
    playlistPreview: Entities.PlaylistPreview;
    onPress?: (playlistPreview: Entities.PlaylistPreview) => void;
  }
}

export function PlaylistPreview({ playlistPreview, onPress }: PlaylistPreview.Props) {
  return (
    <Cover source={{ uri: playlistPreview.backgroundImage.url }}/>
  )
}
