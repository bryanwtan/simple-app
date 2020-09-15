import React, { createContext, useReducer, useContext } from 'react'
import * as user from './user'

/**
 * BT: React Context is designed to share data that can be
 * considered “global” for a tree of React components
 *
 * using it to roll my own redux
 */
const Store = createContext()

const initialState = {
  user: user.initial,
  // additional slices of the "store" would go here
}

const reducer = (state, action) => {
  const { type, ...payload } = action

  if (type in user.actionToState) {
    return {
      ...state,
      user: user.actionToState[type](payload),
    }
  }

  return state
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <Store.Provider value={value}>{children}</Store.Provider>
}

/**
 * BT: wrapped components will be "connected" and can access the store
 * through props
 */
export const withStore = WrappedComponent => {
  const ResultComponent = props => {
    const { state, dispatch } = useContext(Store)

    return <WrappedComponent {...props} state={state} dispatch={dispatch} />
  }

  return ResultComponent
}
