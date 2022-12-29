import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LOCAL_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [registerError, setRegisterError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

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
    setIsSubmitting(true)

    const data = await res.json()
    // console.log(data)
    if (res.ok) {
      setTimeout(() => {
        setUser(data.user)
        setLoginError(null)
        setIsSubmitting(false)
      }, 1000)
      router.push('/account/profile')
    } else {
      setTimeout(() => {
        setIsSubmitting(false)
        setLoginError(data.message)
      }, 1000)
    }
  }

  // Register
  const registerUser = async (user) => {
    const res = await fetch(`${LOCAL_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    setIsSubmitting(true)

    const data = await res.json()
    // console.log(data)
    if (res.ok) {
      setTimeout(() => {
        setUser(data.user)
        setRegisterError(null)
        setIsSubmitting(false)
      }, 1000)
      router.push('/account/profile')
    } else {
      setTimeout(() => {
        setIsSubmitting(false)
        setRegisterError(data.message)
      }, 1000)
    }
  }

  //logout user
  const logout = async () => {
    const res = await fetch(`${LOCAL_URL}/api/logout`, {
      method: 'POST',
    })
    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${LOCAL_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.name)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        loginError,
        registerError,
        registerUser,
        logout,
        isSubmitting,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
