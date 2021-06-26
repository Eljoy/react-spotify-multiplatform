import { RootStateOrAny } from 'react-redux'
import {
  Action,
  AsyncActionCreatorBuilder,
  createReducer,
  Reducer,
} from 'typesafe-actions'

export enum FetchingStatus {
  Idle = 'Idle',
  Fetching = 'Fetching',
  Fetched = 'Fetched',
  FetchingError = 'FetchingError',
}

export default function createFetchingStatusReducer<
  State,
  TAction extends Action
>(
  asyncAction: AsyncActionCreatorBuilder<any, any, any>,
  initialState = FetchingStatus.Idle
): Reducer<FetchingStatus, RootStateOrAny> {
  return createReducer(initialState)
    .handleAction(asyncAction.request, () => FetchingStatus.Fetching)
    .handleAction(asyncAction.success, () => FetchingStatus.Fetched)
    .handleAction(asyncAction.failure, () => FetchingStatus.FetchingError)
}
