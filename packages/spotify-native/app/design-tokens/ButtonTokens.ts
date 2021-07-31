import {createPropertyGetter} from './createPropertyGetter';
import {RoundnessOptions} from './RoundnessTokens';

enum HeightOptions {
  S = 24,
  M = 50,
}

export namespace ButtonTokens {
  export enum Roundness {
    PrimaryButton = RoundnessOptions.S,
    SecondaryButton = RoundnessOptions.S,
    PrimaryCircleButton = RoundnessOptions.Circle,
  }

  export enum Padding {
    PrimaryButton = 48,
    SecondaryButton = 12,
  }

  export enum Height {
    PrimaryButton = HeightOptions.M,
    SecondaryButton = HeightOptions.M,
    PlayButton = HeightOptions.M,
    PlaySmallButton = HeightOptions.S,
  }

  export enum PlayButtonSize {
    S = HeightOptions.S,
    M = HeightOptions.M,
  }
}

export const getButtonRoundnessStyle = createPropertyGetter<ButtonTokens.Roundness>(
  'borderRadius',
);

export const getButtonPaddingStyle = createPropertyGetter<ButtonTokens.Padding>(
  'paddingHorizontal',
);

export const getButtonHeightStyle = createPropertyGetter<
  ButtonTokens.Height | ButtonTokens.PlayButtonSize
>('height');

export const getButtonWidthStyle = createPropertyGetter<ButtonTokens.PlayButtonSize>(
  'width',
);
