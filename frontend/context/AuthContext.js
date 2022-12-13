import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LOCAL_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()

  // Login user
  const login = async ({ email, password }) => {
    const res = await fetch(`${LOCAL_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await res.json()
    // console.log(data)
    if (res.ok) {
      setUser(data.user)
      setError(null)
      console.log('succesful login')
    } else {
      setError(data.message)
    }
  }

  // Register
  const registerUser = async (user) => {
    console.log(user)
  }

  return (
    <AuthContext.Provider value={{ login, user, error, registerUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
