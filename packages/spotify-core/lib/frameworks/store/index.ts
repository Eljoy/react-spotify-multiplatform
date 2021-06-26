import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootSaga from '../rootSaga'

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = []
  middlewares.push(createLogger())
  middlewares.push(sagaMiddleware)
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)
  return store as any
}
