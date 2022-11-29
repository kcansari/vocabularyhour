import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Login user
  const login = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
