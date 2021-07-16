import LayoutComponent, {LayoutProps} from './Layout';
import {LayoutAlign, LayoutDirection} from './layoutUtils';

export const Layout = LayoutComponent;

export namespace Layout {
  export type Align = LayoutAlign;
  export type Direction = LayoutDirection;
  export type Props = LayoutProps;
}
