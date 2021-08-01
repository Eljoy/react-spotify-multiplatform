import React from 'react';
import {Image, ImageProps, ImageStyle} from 'react-native';
import {
  getImageRoundnessStyle,
  getImageSizeStyle,
  ImageTokens,
} from '../../design-tokens';

export declare namespace Thumbnail {
  export type Props = {} & ImageProps;
}

export function Thumbnail({...props}: Thumbnail.Props) {
  const styles: ImageStyle[] = [
    getImageSizeStyle(ImageTokens.Size.Thumbnail),
    getImageRoundnessStyle(ImageTokens.Roundness.Thumbnail),
  ];
  return <Image {...props} style={styles} />;
}
