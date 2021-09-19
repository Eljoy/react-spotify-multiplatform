import React, { useMemo } from 'react'
import { Entities } from 'spotify-core'
import { getHeightStyle, getImageRoundnessStyle, IconTokens, ImageTokens, SizeTokens } from '../../../design-tokens'
import { useAppTheme } from '../../../theme'
import { BlurredBackground } from '../../containers/BlurredBackground'
import { Icon } from '../../icons'
import { Thumbnail } from '../../images'
import { Layout } from '../../layout'
import { BodyText, CaptionText } from '../../typography'
import { TouchableNativeFeedback } from 'react-native'
import noop from 'lodash.noop'

export declare namespace TrackItem {
  export type Props = {
    track: Entities.Track;
    isPlaying?: boolean;
    onPress?: (track: Entities.Track) => unknown
  } & Pick<Layout.Props, 'style'>;
}

export function TrackItem({ track, isPlaying = false, onPress = noop, style }: TrackItem.Props) {
  const artistNames = useMemo(() => (track.artists.reduce(
    (names, artist) => (names ? `${names}, ${artist.name}` : artist.name),
    '',
  )), [track])
  return (
    <TouchableNativeFeedback onPress={()=>{
      onPress(track)
    }}>
      <Layout
        direction='row'
        align='center center'
        paddingScale={2}
        style={style}>
        <Layout>
          {isPlaying && <ThumbnailMask />}
          <Thumbnail source={{ uri: track.album.icon.url }} />
        </Layout>
        <Layout flex={1} align='center start' paddingHorizontalScale={2}>
          <BodyText isActive={isPlaying}>{track.name}</BodyText>
          <CaptionText>{artistNames}</CaptionText>
        </Layout>
      </Layout>
    </TouchableNativeFeedback>
  )
}

function ThumbnailMask() {
  const { colors } = useAppTheme()
  const styles: Layout.Props['style'][] = [
    getImageRoundnessStyle(ImageTokens.Roundness.Thumbnail),
    {position: 'absolute'}
  ]
  return (
    <BlurredBackground
      blurAmount={5}
      blurType='light'
      style={styles}>
      <Layout
        flex={1}
        align='center center'
        style={{ zIndex: BlurredBackground.zIndex.NotBlurred }}>
        <Icon
          name='pause'
          size={IconTokens.Size.ControlsPrimary}
          style={{ color: colors.text.button, opacity: 0.7 }}
        />
      </Layout>
    </BlurredBackground>
  )
}
