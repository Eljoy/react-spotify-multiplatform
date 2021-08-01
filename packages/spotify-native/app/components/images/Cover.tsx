import React from 'react';
import {Image, ImageProps, ImageStyle} from 'react-native';
import {
  getImageRoundnessStyle,
  getImageSizeStyle,
  ImageTokens,
} from '../../design-tokens';

export declare namespace Cover {
  export type Props = {} & ImageProps;
}

export function Cover({...props}: Cover.Props) {
  const styles: ImageStyle[] = [
    getImageSizeStyle(ImageTokens.Size.Cover),
    getImageRoundnessStyle(ImageTokens.Roundness.Cover),
  ];
  return <Image {...props} style={styles} />;
}
