import React from 'react'
import { withStore } from './store/provider'
import { logoutAction } from './store/user'

/**
 * BT: technically, this deserves a new route
 */
export const SignedInView = withStore(({ state, dispatch }) => {
  const { username, path, datetime } = state.user

  const logout = () => {
    logoutAction(dispatch)
  }

  const fullInfo = [
    {
      label: 'Welcome back ',
      value: username,
    },
    {
      label: 'Logged in at ',
      value: datetime,
    },
    {
      label: 'This app is running from ',
      value: path,
    },
  ]

  return (
    <div>
      {fullInfo.map((infoBlock, i) => (
        <div className='info-item' key={i}>
          {infoBlock.label}
          <span className='api-data'>{infoBlock.value}</span>
        </div>
      ))}
      <button className='logout ripple-neutral' onClick={logout}>
        Logout
      </button>
    </div>
  )
})
