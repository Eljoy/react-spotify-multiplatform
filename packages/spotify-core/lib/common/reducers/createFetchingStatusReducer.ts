import { Action, Reducer, AsyncActionCreatorBuilder } from "typesafe-actions";
import { RootStateOrAny } from "react-redux";
import { createReducer } from "typesafe-actions";

export enum FetchingStatus {
  NotFetched = 'NotFetched',
  Fetching = 'Fetching',
  Fetched = 'Fetched',
  FetchingError = 'FetchingError'
}

export default function createFetchingStatusReducer<State,
  TAction extends Action>(asyncAction: AsyncActionCreatorBuilder<any, any, any>,
                          initialState = FetchingStatus.NotFetched): Reducer<FetchingStatus, RootStateOrAny> {
  return createReducer(initialState)
    .handleAction(asyncAction.request, () => FetchingStatus.Fetching)
    .handleAction(asyncAction.success, () => FetchingStatus.Fetched)
    .handleAction(asyncAction.failure, () => FetchingStatus.FetchingError);
}
