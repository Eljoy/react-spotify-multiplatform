import {createPropertyGetter} from './createPropertyGetter';
import {RoundnessOptions} from './RoundnessTokens';

enum SizeOptions {
  S = 48,
  M = 300,
}

export namespace ImageTokens {
  export enum Roundness {
    Thumbnail = RoundnessOptions.M,
    Cover = RoundnessOptions.M,
  }

  export enum Size {
    Thumbnail = SizeOptions.S,
    Cover = SizeOptions.M,
  }
}

export const getImageRoundnessStyle = createPropertyGetter<ImageTokens.Roundness>(
  'borderRadius',
);

const getImageWidthStyle = createPropertyGetter<ImageTokens.Size>('width');

const getImageHeightStyle = createPropertyGetter<ImageTokens.Size>('height');

export const getImageSizeStyle = (size: ImageTokens.Size) => {
  return {
    ...getImageHeightStyle(size),
    ...getImageWidthStyle(size),
  };
};
