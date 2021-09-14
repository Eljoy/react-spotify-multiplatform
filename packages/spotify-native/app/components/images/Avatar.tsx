import { Image, ImageProps, ImageStyle } from 'react-native'
import { getImageRoundnessStyle, getImageSizeStyle, ImageTokens } from '../../design-tokens'
import React from 'react'
import Layout from '../layout/Layout'

export declare namespace Avatar {
  export type Props = {} & ImageProps;
}

export function Avatar({ ...props }: Avatar.Props) {
  const styles: ImageStyle[] = [
    getImageSizeStyle(ImageTokens.Size.Avatar),
    getImageRoundnessStyle(ImageTokens.Roundness.Avatar),
  ]
  return (
    <Layout style={{margin: 5}}>
      <Image {...props} style={styles} />
    </Layout>
  )
}
