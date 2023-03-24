import useAuth from 'hooks/useAuth'
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthRequired = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    auth.accessToken
      ? <Outlet />
      : <Navigate to="/signin" state={{ from: location }} replace />
  )
}

export default AuthRequired
