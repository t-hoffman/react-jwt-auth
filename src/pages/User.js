import useAuth from 'hooks/useAuth'
import React from 'react'

const User = () => {
  const { auth } = useAuth()

  return (
    <div>
      User page:<br />
      Welcome, {auth.username}! ACCESS_TOKEN: {auth.accessToken}
    </div>
  )
}

export default User
