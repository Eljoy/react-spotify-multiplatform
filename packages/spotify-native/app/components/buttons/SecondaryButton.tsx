import React, {ReactNode} from 'react';
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  ViewStyle,
} from 'react-native';
import {
  ButtonTokens,
  getButtonHeightStyle,
  getButtonPaddingStyle,
  getButtonRoundnessStyle,
} from '../../design-tokens';
import {useAppTheme} from '../../theme';
import Layout from '../layout/Layout';
import ButtonText from '../typography/ButtonText';

type Props = {
  children?: ReactNode;
  style?: ViewStyle
} & TouchableNativeFeedbackProps;

export default function SecondaryButton({children, style, ...props}: Props) {
  const {colors} = useAppTheme();
  const styles: ViewStyle[] = [
    {backgroundColor: colors.buttons.secondary},
    getButtonRoundnessStyle(ButtonTokens.Roundness.SecondaryButton),
    getButtonPaddingStyle(ButtonTokens.Padding.SecondaryButton),
    getButtonHeightStyle(ButtonTokens.Height.SecondaryButton),
    style
  ];
  return (
    <TouchableNativeFeedback {...props}>
      <Layout style={styles} align="center center">
        <ButtonText>{children}</ButtonText>
      </Layout>
    </TouchableNativeFeedback>
  );
}

SecondaryButton.Text = ButtonText
