import useAuth from 'hooks/useAuth';
import React, { useEffect } from 'react';

const Test = () => {
  const { auth } = useAuth()

  const fetchData = async () => {
    console.log('hey')
    const response = await (await fetch('/test/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })).json()
    console.log(response)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return auth.accessToken ? <div><h2>Welcome!</h2>Hello there, {auth.username}!</div> : <div>TEST</div>;
};

export default Test;
