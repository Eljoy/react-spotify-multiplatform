import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useAppTheme} from '../../theme';
import {Layout} from '../layout';

export declare namespace AppBackground {
  export type Props = {} & Layout.Props;
}

export function AppBackground({
  children,
  style,
  ...props
}: AppBackground.Props) {
  const {colors} = useAppTheme();
  const styles: StyleProp<ViewStyle>[] = [
    {backgroundColor: colors.background},
    style,
  ];
  return (
    <Layout style={styles} flex={1} {...props}>
      {children}
    </Layout>
  );
}
