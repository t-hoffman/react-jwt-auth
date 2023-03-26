import React from 'react'
import { useLocation } from 'react-router-dom'
import SigninForm from '../components/SignInForm'

const SignInPage = () => {
  const location = useLocation()
  const from = location.state?.from.pathname || '/'

  return (
    <div>
      Sign in page:<br />
      <SigninForm from={from} />
    </div>
  )
}

export default SignInPage
