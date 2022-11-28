import Login from './Login'
import Logout from './Logout'

export default function Header() {
  const user = true

  return <>{user ? <Login /> : <p>static</p>}</>
}
