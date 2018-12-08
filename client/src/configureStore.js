import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import imageApp from './reducers'

export default function configureStore(initialState) {
  return createStore(
    imageApp,
    initialState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}