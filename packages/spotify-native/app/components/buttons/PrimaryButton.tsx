import React, { ReactNode } from 'react'
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  ViewStyle,
} from 'react-native'
import {
  ButtonTokens,
  getButtonHeightStyle,
  getButtonPaddingStyle,
  getButtonRoundnessStyle,
} from '../../design-tokens'
import { useAppTheme } from '../../theme'
import Layout from '../layout/Layout'
import ButtonText from '../typography/ButtonText'

type Props = {
  children?: ReactNode;
  style?: ViewStyle
} & TouchableNativeFeedbackProps;

export default function PrimaryButton({ children, style, ...props }: Props) {
  const { colors } = useAppTheme()
  const styles: ViewStyle[] = [
    { backgroundColor: colors.buttons.primary },
    getButtonRoundnessStyle(ButtonTokens.Roundness.PrimaryButton),
    getButtonPaddingStyle(ButtonTokens.Padding.PrimaryButton),
    getButtonHeightStyle(ButtonTokens.Height.PrimaryButton),
    style,
  ]
  return (
    <TouchableNativeFeedback {...props}>
      <Layout style={styles} align='center center'>
        <ButtonText>{children}</ButtonText>
      </Layout>
    </TouchableNativeFeedback>
  )
}
