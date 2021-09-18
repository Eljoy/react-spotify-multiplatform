import React from 'react';
import {Entities} from 'spotify-core';
import {getHeightStyle, IconTokens, SizeTokens} from '../../../design-tokens';
import {useAppTheme} from '../../../theme';
import {BlurredBackground} from '../../containers/BlurredBackground';
import {Icon} from '../../icons';
import {Thumbnail} from '../../images';
import {Layout} from '../../layout';
import {BodyText, CaptionText} from '../../typography';

export declare namespace TrackItem {
  export type Props = {
    track: Entities.Track;
    isPlaying: boolean;
  } & Pick<Layout.Props, 'style'>;
}

export function TrackItem({track, isPlaying = true, style}: TrackItem.Props) {
  const artistNames = track.artists.reduce(
    (names, artist) => (names ? ', ' + artist.name : artist.name),
    '',
  );
  const styles: TrackItem.Props['style'][] = [
    getHeightStyle(SizeTokens.Height.TrackItem),
    style,
  ];
  return (
    <Layout
      direction="row"
      align="center center"
      marginScale={2}
      style={styles}>
      <Layout>
        {isPlaying && <ThumbnailMask />}
        <Thumbnail source={{uri: track.album.backgroundImage.url}} />
      </Layout>
      <Layout flex={1} align="center start" paddingHorizontalScale={2}>
        <BodyText isActive={isPlaying}>{track.name}</BodyText>
        <CaptionText>{artistNames}</CaptionText>
      </Layout>
    </Layout>
  );
}

function ThumbnailMask() {
  const {colors} = useAppTheme();
  return (
    <BlurredBackground
      blurAmount={5}
      blurType="light"
      style={{position: 'absolute', borderRadius: 10}}>
      <Layout
        flex={1}
        align="center center"
        style={{zIndex: BlurredBackground.zIndex.NotBlurred}}>
        <Icon
          name="pause"
          size={IconTokens.Size.ControlsPrimary}
          style={{color: colors.text.button, opacity: 0.9}}
        />
      </Layout>
    </BlurredBackground>
  );
}
