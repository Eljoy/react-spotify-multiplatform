import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {
  getMargin,
  getMarginHorizontal,
  getMarginVertical,
  getPadding,
  getPaddingHorizontal,
  getPaddingVertical,
} from '../../design-tokens';
import {LayoutAlign, LayoutDirection, LayoutUtils} from './layoutUtils';

export type LayoutProps = {
  flex?: number;
  height?: number;
  width?: number;
  direction?: LayoutDirection;
  align?: LayoutAlign;
  marginScale?: number;
  marginHorizontalScale?: number;
  marginVerticalScale?: number;
  paddingScale?: number;
  paddingHorizontalScale?: number;
  paddingVerticalScale?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export default function Layout({
  flex,
  height,
  width,
  direction,
  align,
  marginScale,
  marginHorizontalScale,
  marginVerticalScale,
  paddingScale,
  paddingHorizontalScale,
  paddingVerticalScale,
  style,
  children,
  ...props
}: LayoutProps) {
  const layoutStyle = [
    flex && {flex},
    direction && LayoutUtils.toLayoutStyle(direction),
    align && LayoutUtils.toLayoutAlignStyle(align),
    height && {height},
    width && {width},
    marginScale && getMargin(marginScale),
    marginHorizontalScale && getMarginHorizontal(marginHorizontalScale),
    marginVerticalScale && getMarginVertical(marginVerticalScale),
    paddingScale && getPadding(paddingScale),
    paddingHorizontalScale && getPaddingHorizontal(paddingHorizontalScale),
    paddingVerticalScale && getPaddingVertical(paddingVerticalScale),
    style,
  ] as StyleProp<ViewStyle>;

  return (
    <View style={layoutStyle} {...props}>
      {children}
    </View>
  );
}
