import { BASE_URL } from '../../config/env.js'

const User = {
  id: {
    type: 'string',
    required: true,
    uniqueIn: await fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => data.map((user) => user.id))
  },
  username: {
    type: 'string',
    length: 20,
    required: true,
    uniqueIn: await fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => data.map((user) => user.username))
  },
  password: {
    type: 'string',
    format: {
      regex: /^(?=.*[0-9])(?=.*[a-z]).{8,}$/,
      simplified: 'At least 8 characters with 1 number and 1 lowercase letter'
    },
    required: true
  }
}

export default User
