import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {
  getMargin,
  getMarginHorizontal,
  getMarginVertical,
  getPadding,
  getPaddingHorizontal,
  getPaddingVertical,
} from '../../styles';
import {Layout} from './layout';

export interface BlockProps {
  flex?: number;
  height?: number;
  width?: number;
  layout?: Layout.LayoutDirection;
  layoutAlign?: Layout.LayoutAlign;
  marginScale?: number;
  marginHorizontalScale?: number;
  marginVerticalScale?: number;
  paddingScale?: number;
  paddingHorizontalScale?: number;
  paddingVerticalScale?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

function Block({
  flex,
  height,
  width,
  layout,
  layoutAlign,
  marginScale,
  marginHorizontalScale,
  marginVerticalScale,
  paddingScale,
  paddingHorizontalScale,
  paddingVerticalScale,
  style,
  children,
  ...props
}: BlockProps) {
  const blockStyle = [
    flex && {flex},
    layout && Layout.toLayoutStyle(layout),
    layoutAlign && Layout.toLayoutAlignStyle(layoutAlign),
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
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
}

export default Block;
