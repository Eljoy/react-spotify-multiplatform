import {createPropertyGetter} from './createPropertyGetter';

enum FontSizeOptions {
  XS = 11,
  S = 14,
  M = 16,
  L = 24,
}

enum FontWeightOptions {
  Normal = 'normal',
  Heavy = 'bold',
}

enum FontFamilyOptions {
  Roboto = 'roboto',
  Inter = 'inter',
}

export namespace TokenTypography {
  export enum FontSize {
    Body = FontSizeOptions.S,
    Caption = FontSizeOptions.XS,
    Title = FontSizeOptions.L,
    SubTitle = FontSizeOptions.M,
    Button = FontSizeOptions.M,
  }

  export enum FontWeight {
    Body = FontWeightOptions.Normal,
    Caption = FontWeightOptions.Normal,
    Title = FontWeightOptions.Heavy,
    SubTitle = FontWeightOptions.Heavy,
    Button = FontWeightOptions.Heavy,
  }

  export enum FontFamily {
    Body = FontFamilyOptions.Roboto,
    Caption = FontFamilyOptions.Inter,
    Title = FontFamilyOptions.Inter,
    SubTitle = FontFamilyOptions.Inter,
    Button = FontFamilyOptions.Roboto,
  }
}

export const getFontSizeStyle = createPropertyGetter<TokenTypography.FontSize>(
  'fontSize',
);

export const getFontWeightStyle = createPropertyGetter<TokenTypography.FontWeight>(
  'fontWeight',
);

export const getFontFamilyStyle = createPropertyGetter<TokenTypography.FontFamily>(
  'fontFamily',
);

export const getFontColorStyle = createPropertyGetter('color');
