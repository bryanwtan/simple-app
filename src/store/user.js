/**
 * BT: this organization most closely resembles the ducks pattern
 * https://github.com/erikras/ducks-modular-redux
 */

/**
 * user initial state
 */
export const initial = {
  // BT: sessionStorage is the better place for this to persist until tab is closed
  isSignedIn: false,
  username: null,

  // these don't belong in the user slice, merged to save time
  isUnauthorized: false,
  message: '',
  path: '',
  datetime: '',
}

/**
 * a functional alternative to the redux switch convention, this is more unit testable
 */
export const actionToState = {
  LOG_IN: ({ username, path, datetime }) => ({
    ...initial,
    isSignedIn: true,
    username,
    path,
    datetime,
  }),
  FAIL_LOG_IN: ({ message }) => ({
    ...initial,
    isUnauthorized: true,
    message,
  }),
  LOG_OUT: () => initial,
  RESET: () => initial,
}

/**
 * action creators
 */
export const loginAction = ({ username, path, datetime }, dispatch) =>
  dispatch({
    type: 'LOG_IN',
    username,
    path,
    datetime,
  })

export const logoutAction = dispatch =>
  dispatch({
    type: 'LOG_OUT',
  })

export const resetAction = dispatch =>
  dispatch({
    type: 'RESET',
  })

export const failLoginAction = (message, dispatch) =>
  dispatch({
    type: 'FAIL_LOG_IN',
    message,
  })
