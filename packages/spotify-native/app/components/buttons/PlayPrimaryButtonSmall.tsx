import React from 'react';
import {ViewStyle} from 'react-native';
import {
  ButtonTokens,
  getButtonHeightStyle,
  getButtonWidthStyle,
} from '../../design-tokens';
import {PlayPrimaryButton} from './PlayPrimaryButton';

declare namespace PlayPrimaryButtonSmall {
  export type Props = {
    isPlaying?: boolean;
  } & PlayPrimaryButton.Props;
}

export function PlayPrimaryButtonSmall({
  iconSize = 15,
  ...props
}: PlayPrimaryButtonSmall.Props) {
  const styles: ViewStyle[] = [
    getButtonHeightStyle(ButtonTokens.PlayButtonSize.S),
    getButtonWidthStyle(ButtonTokens.PlayButtonSize.S),
  ];
  return <PlayPrimaryButton {...{...props, iconSize}} style={styles} />;
}
