import React, {ReactNode} from 'react';
import {ImageStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Layout} from '../layout';

type AxisPosition = {
  offset: number;
  width: number;
};

export declare namespace GradientShadow {
  type Props = {
    colors: string[];
    children?: ReactNode;
    width: number;
    height: number;
    position?: {
      left: AxisPosition;
      top: AxisPosition;
      right: AxisPosition;
      bottom: AxisPosition;
    };
  };
}

const defaultShadowPosition: GradientShadow.Props['position'] = {
  left: {
    offset: 0.05,
    width: 0.2,
  },
  top: {
    offset: 0.05,
    width: 0.15,
  },
  right: {
    offset: 0.05,
    width: 0.15,
  },
  bottom: {
    offset: 0.05,
    width: 0.2,
  },
};

export function GradientShadow({
  colors: [startColor, endColor],
  width,
  height,
  children,
  position: {left, top, right, bottom} = defaultShadowPosition,
}: GradientShadow.Props) {
  const gradient: ImageStyle = {
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 1,
  };
  return (
    <Layout align="center center" style={{flex: 1}}>
      <LinearGradient
        start={{x: left.offset, y: 0}}
        end={{x: left.offset + left.width, y: 0}}
        colors={[startColor, endColor]}
        style={gradient}
      />
      <LinearGradient
        start={{x: 0, y: top.offset}}
        end={{x: 0, y: top.offset + top.width}}
        colors={[startColor, endColor]}
        style={gradient}
      />
      <LinearGradient
        start={{x: 1 - right.offset, y: 0}}
        end={{x: 1 - right.offset - right.width, y: 0}}
        colors={[startColor, endColor]}
        style={gradient}
      />
      <LinearGradient
        start={{x: 0, y: 1 - bottom.offset}}
        end={{x: 0, y: 1 - bottom.offset - bottom.width}}
        colors={[startColor, endColor]}
        style={gradient}
      />
      {children}
    </Layout>
  );
}
