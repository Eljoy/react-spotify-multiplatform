import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ButtonTokens,
  getButtonHeightStyle,
  getButtonRoundnessStyle,
  getButtonWidthStyle,
} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import Layout from '../layout/Layout';

export declare namespace PlayPrimaryButton {
  export type Props = {
    isPlaying?: boolean;
    iconSize?: number;
    style?: ViewStyle;
  } & TouchableNativeFeedbackProps;
}

export function PlayPrimaryButton({
  isPlaying = false,
  style = {},
  iconSize = 35,
  ...props
}: PlayPrimaryButton.Props) {
  const {colors} = useAppTheme();
  const styles: ViewStyle[] = [
    {backgroundColor: colors.buttons.primary},
    getButtonRoundnessStyle(ButtonTokens.Roundness.PrimaryCircleButton),
    getButtonHeightStyle(ButtonTokens.PlayButtonSize.M),
    getButtonWidthStyle(ButtonTokens.PlayButtonSize.M),
    style,
  ];
  const iconName = isPlaying ? 'pause' : 'play-arrow';
  return (
    <TouchableNativeFeedback {...props}>
      <Layout style={styles} align="center center">
        <Icon name={iconName} color={colors.text.button} size={iconSize} />
      </Layout>
    </TouchableNativeFeedback>
  );
}
