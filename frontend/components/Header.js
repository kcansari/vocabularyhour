import Login from './Login'
import Logout from './Logout'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

export default function Header() {
  const { user } = useContext(AuthContext)
  // console.log(user)

  return <>{user === null ? <Login /> : <Logout />}</>
}
