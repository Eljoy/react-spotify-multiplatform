export const spaceScale = [0, 4, 8, 16, 32, 64] as const;

export const roundnessScale = [4, 8, 12] as const;

const createScaledPropertyGetter = (property: string) => (x: number) => {
  return {[property]: spaceScale[x]};
};

export const getMargin = createScaledPropertyGetter('margin');

export const getMarginHorizontal = createScaledPropertyGetter(
  'marginHorizontal',
);

export const getMarginVertical = createScaledPropertyGetter('marginVertical');

export const getPadding = createScaledPropertyGetter('padding');

export const getPaddingHorizontal = createScaledPropertyGetter(
  'paddingHorizontal',
);

export const getPaddingVertical = createScaledPropertyGetter('paddingVertical');
