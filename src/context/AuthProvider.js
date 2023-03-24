import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

const getLocalStorage = (key, initialValue) => {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  } catch (error) {
    return initialValue
  }
}

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getLocalStorage('auth', {}))

  const verifyToken = async (token) => {
    console.log('verify')
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }

    const response = await (await fetch('/auth/verify', options)).json()
    if (!response.accessToken) {
      refreshToken()
    }
  }

  const refreshToken = async () => {
    const response = await (await fetch('/auth/refresh', { method: 'POST', credentials: 'include' })).json()

    if (!response.accessToken) return setAuth({})

    setAuth({...auth, accessToken: response.accessToken})
  }

  useEffect(() => {
    if (auth.accessToken) verifyToken(auth.accessToken)
  }, [auth.accessToken])

  useEffect(() => {
    setLocalStorage('auth', auth)
  }, [auth])
  console.log(auth)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
