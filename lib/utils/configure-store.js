/* global __DEVTOOLS__ */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'
import persistenceStore from '../persistence/store'
import * as reducers from '../reducers'

let combinedCreateStore
const storeEnhancers = [persistenceStore]
if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools')
  storeEnhancers.push(devTools())
}
// compose: use Array.reduceRight((previousValue, currentValue, index, array) => {}) to work
// createStore: params -- reducers, initialState; return -- {
//                                                            dispatch: dispatch,
//                                                            subscribe: subscribe,
//                                                            getState: getState,
//                                                            replaceReducer: replaceReducer
//                                                          }
combinedCreateStore = compose(...storeEnhancers)(createStore)
const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore)
const combinedReducer = combineReducers(reducers)

export default function configureStore (initialState) {

  const store = finalCreateStore(combinedReducer, initialState)
  // 1. finalCreateStore return a function (reducer, initialState)
  //     execute this function will receive a new Store which dispatch has been wraped to a chain
  // 2. in finalCreateStore: store = next(reducer, initialState), here next is combinedCreateStore,
  //     so it replace createStore, in the inner of createStore, it execute an array, and the last
  //     function is persistenceStore, it return a function that simliar to createStore

  if (module.hot)
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index')
      store.replaceReducer(nextRootReducer)
    })

  return store
}
