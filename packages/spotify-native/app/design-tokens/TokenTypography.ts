import {createPropertyGetter} from './createPropertyGetter';

enum FontSizeOptions {
  S = 11,
  M = 14,
  LM = 16,
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
    Body = FontSizeOptions.M,
    Caption = FontSizeOptions.S,
    Title = FontSizeOptions.L,
    Button = FontSizeOptions.LM,
  }

  export enum FontWeight {
    Body = FontWeightOptions.Normal,
    Caption = FontWeightOptions.Normal,
    Title = FontWeightOptions.Heavy,
    Button = FontWeightOptions.Heavy,
  }

  export enum FontFamily {
    Body = FontFamilyOptions.Roboto,
    Caption = FontFamilyOptions.Roboto,
    Title = FontFamilyOptions.Roboto,
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
