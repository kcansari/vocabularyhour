import bcrypt from 'bcryptjs'

const users = [
  {
    username: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    verified: true,
    Words: {
      bottle: 'şişe',
      keyboard: 'klavye',
      metaphor: 'mecaz',
    },
  },
  {
    username: 'Kemal Can',
    email: 'kemalcan@example.com',
    password: bcrypt.hashSync('123456', 10),
    verified: true,
    Words: {
      'residence permit': 'oturma izni',
      migrate: 'göç etmek',
      proverb: 'atasözü',
    },
  },
]

export default users
