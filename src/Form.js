import React, { useEffect, useState } from 'react'
import { withStore } from './store/provider'
import { failLoginAction, loginAction, resetAction } from './store/user'

export const LoginForm = withStore(({ dispatch }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    resetAction(dispatch)
  }, [username, password, dispatch])

  const login = async evt => {
    evt.preventDefault()

    /**
     * BT: insecure proxy (package.json) to the api for dev mode
     * this needs SSL in production
     */
    const response = await fetch('/login', {
      method: 'post',
      body: JSON.stringify({ username, password }),
    })

    if (response.status === 200) {
      const { body } = await response.json()
      loginAction(body, dispatch)
    } else {
      failLoginAction(await response.text(), dispatch)
    }
  }

  return (
    <>
      <form onSubmit={login}>
        <input
          type='text'
          value={username}
          // BT: the traditional ux recommendation is for the placeholder
          // to contain an example of a username, not the label
          // looked at Google/FB, and cosmetics win these days
          placeholder='Username'
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
        />
        <input className='submit ripple' type='submit' value='Login' />
      </form>
    </>
  )
})
