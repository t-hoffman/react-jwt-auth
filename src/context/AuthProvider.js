import { createContext, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext({});
const initialState = {}

const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('setLocal',error)
  }
}

const getLocalStorage = (key, initialValue) => {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  } catch (error) {
    console.log('getLocal',error)
    return initialValue
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'sign-in':
      setLocalStorage('auth', action.payload)
      return action.payload
    case 'sign-out':
      setLocalStorage('auth', initialState)
      return initialState
    case 'refresh':
      setLocalStorage('auth', { ...state, accessToken: action.payload })
      return {...state, accessToken: action.payload}
  }
}
  
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getLocalStorage('auth', initialState))
  const location = useLocation()

  const verifyToken = async (token) => {
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
    if (!response.accessToken) return dispatch({ type: 'sign-out' })

    dispatch({ type: 'refresh', payload: response.accessToken })
  }

  useEffect(() => {
    if (state.accessToken) verifyToken(state.accessToken)
  }, [location])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
