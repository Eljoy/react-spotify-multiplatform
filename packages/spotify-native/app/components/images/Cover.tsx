import React from 'react';
import {Image, ImageProps, ImageStyle, StyleProp} from 'react-native';
import {
  getImageRoundnessStyle,
  getImageSizeStyle,
  ImageTokens,
} from '../../design-tokens';

export declare namespace Cover {
  export type Props = {} & ImageProps;
}

export function Cover({style, ...props}: Cover.Props) {
  const styles: StyleProp<ImageStyle>[] = [
    getImageSizeStyle(ImageTokens.Size.Cover),
    getImageRoundnessStyle(ImageTokens.Roundness.Cover),
    style,
  ];
  return <Image {...props} style={styles} />;
}
