export enum ColorOptions {
  Green = '#1CBFB5',
  White = '#FFFFFF',
  Grey = '#B3B3B3',
  Black50 = '#3B4753',
  Black100 = '#000000',
  Transparent = 'transparent',
}

export enum TextColors {
  PrimaryOnDark = ColorOptions.White,
  SecondaryOnDark = ColorOptions.White,
  CaptionOnDark = ColorOptions.Grey,
}

export const Colors = {
  Text: {
    PrimaryOnDark: ColorOptions.White,
    SecondaryOnDark: ColorOptions.Grey,
  },
  Button: ColorOptions.Green,
  TrackSlider: {
    Whole: ColorOptions.Black50,
    Active: ColorOptions.Green,
  },
  // Controls: {
  //   Primary: ColorOptions.White,
  //   Secondary: ColorOptions.Grey,
  //   Active: ColorOptions.Green
  // }
} as const;
