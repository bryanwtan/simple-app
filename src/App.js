import React from 'react'

import './App.css'
import { LoginForm } from './Form'
import { SignedInView } from './SignedInView'
import { withStore } from './store/provider'

const App = ({ state }) => (
  <>
    {state.user.isUnauthorized && (
      <div className='notification'>{state.user.message}</div>
    )}
    <div className='app'>
      {state.user.isSignedIn ? <SignedInView /> : <LoginForm />}
    </div>
  </>
)

export default withStore(App)
