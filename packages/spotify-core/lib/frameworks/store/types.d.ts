import { StateType } from 'typesafe-actions'
import { configureStore } from './index'

declare module 'typesafe-actions' {
  export type Store = StateType<ReturnType<typeof configureStore>>;
  export type RootState = StateType<typeof import('./rootReducer').default>;
}
