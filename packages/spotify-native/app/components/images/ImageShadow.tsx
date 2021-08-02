import React from 'react';
import {Image, ImageProps, ImageStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Layout} from '../layout';
import {Cover} from './Cover';

export declare namespace ImageShadow {
  export type Props = {} & ImageProps;
}

export function ImageShadow({source}: ImageShadow.Props) {
  const style: ImageStyle = {
    height: 400,
    width: 400,
    position: 'absolute',
  };
  const gradient: ImageStyle = {
    width: 450,
    height: 450,
    position: 'absolute',
    zIndex: 1,
  };
  const coverStyle: ImageStyle = {
    position: 'absolute',
    zIndex: 90,
    borderRadius: 12,
  };
  return (
    <Layout align="center center" style={{width: 450, height: 450}}>
      <LinearGradient
        start={{x: 0.05, y: 0}}
        end={{x: 0.2, y: 0}}
        colors={['#000000', '#FFFFFF00']}
        style={gradient}
      />
      <LinearGradient
        start={{x: 0.95, y: 0}}
        end={{x: 0.8, y: 0}}
        colors={['#000000', '#FFFFFF00']}
        style={gradient}
      />
      <LinearGradient
        start={{x: 0, y: 0.05}}
        end={{x: 0, y: 0.2}}
        colors={['#000000', '#FFFFFF00']}
        style={gradient}
      />
      <LinearGradient
        start={{x: 0, y: 0.95}}
        end={{x: 0, y: 0.75}}
        colors={['#000000', '#FFFFFF00']}
        style={gradient}
      />
      <Image source={source} style={style} blurRadius={100} />
      <Cover source={source} style={coverStyle} />
    </Layout>
  );
}
