import React, { ReactNode } from 'react'
import { Image, ImageProps, ImageStyle, StyleProp } from 'react-native'
import {
  ColorOptions,
  getImageRoundnessStyle,
  getImageSizeStyle,
  ImageTokens,
} from '../../design-tokens'
import { useAppTheme } from '../../theme'
import { GradientShadow } from '../gradient/GradientShadow'
import Layout from '../layout/Layout'

export declare namespace Cover {
  export type Props = {
    children?: ReactNode;
  } & ImageProps;
}

export function Cover({ style, source, children }: Cover.Props) {
  const { colors } = useAppTheme()
  const shadowWidth = ImageTokens.Size.Cover + 50
  const shadowHeight = ImageTokens.Size.Cover + 50
  const imageStyles: StyleProp<ImageStyle>[] = [
    getImageSizeStyle(ImageTokens.Size.Cover),
    getImageRoundnessStyle(ImageTokens.Roundness.Cover),
    style,
    { zIndex: 2 },
  ]
  return (
    <GradientShadow
      colors={[colors.background, ColorOptions.Transparent]}
      width={shadowWidth}
      height={shadowHeight}>
      <Image
        source={source}
        style={{
          width: shadowWidth,
          height: shadowHeight,
          position: 'absolute',
        }}
        blurRadius={1000}
      />
      <Image source={source} style={imageStyles} />
      <Layout
        style={{ position: 'absolute', zIndex: 2, overflow: 'hidden', borderRadius: ImageTokens.Roundness.Cover }}
        height={ImageTokens.Size.Cover}
        width={ImageTokens.Size.Cover}>
        {children}
      </Layout>
    </GradientShadow>
  )
}
