import bcrypt from 'bcryptjs'

const users = [
  {
    username: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    verified: true,
  },
  {
    username: 'Kemal Can',
    email: 'kemalcan@example.com',
    password: bcrypt.hashSync('123456', 10),
    verified: true,
  },
]

export default users
