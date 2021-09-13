import React, { ReactNode } from 'react'
import { BlurView, BlurViewProperties } from '@react-native-community/blur'
import { Layout } from '../layout'
import { StyleSheet } from 'react-native'

export declare namespace BlurredBackground {
  export type Props = { children?: ReactNode, style?: Layout.Props['style'] } & BlurViewProperties
}

export function BlurredBackground({ children, style, ...props }: BlurredBackground.Props) {
  const containerStyle: Layout.Props['style'][] = [
    {overflow: 'hidden'},
    style,
  ]
  return (
    <Layout style={containerStyle}>
      <Layout flex={1} style={styles.absolute}>
        <BlurView
          blurType='dark'
          blurAmount={50}
          style={styles.absolute}
          reducedTransparencyFallbackColor="white"
          {...props}
        >
        </BlurView>
      </Layout>
      {children}
    </Layout>
  )
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
})
