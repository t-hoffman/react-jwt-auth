import useAuth from 'hooks/useAuth'
import React, { useEffect } from 'react'

const SignOutPage = () => {
  const { setAuth } = useAuth()

  const signOut = async () => {
    const response = await (await fetch('/auth/signout', { method: 'POST', credentials: 'include' })).json()
    setAuth({})
  }

  useEffect(() => {
    signOut()
  }, [])

  return (
    <div>
      Signed out
    </div>
  )
}

export default SignOutPage
