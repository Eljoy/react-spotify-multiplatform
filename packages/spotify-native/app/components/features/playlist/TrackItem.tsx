import React from 'react';
import {Entities} from 'spotify-core';
import {getHeightStyle, SizeTokens} from '../../../design-tokens/SizeTokens';
import {Thumbnail} from '../../images';
import {Layout} from '../../layout';
import {BodyText, CaptionText} from '../../typography';

export declare namespace TrackItem {
  export type Props = {
    track: Entities.Track;
  } & Pick<Layout.Props, 'style'>;
}

export function TrackItem({track, style}: TrackItem.Props) {
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
        <Thumbnail source={{uri: track.album.backgroundImage.url}} />
      </Layout>
      <Layout flex={1} align="center start" paddingHorizontalScale={2}>
        <BodyText>{track.name}</BodyText>
        <CaptionText>{artistNames}</CaptionText>
      </Layout>
    </Layout>
  );
}
