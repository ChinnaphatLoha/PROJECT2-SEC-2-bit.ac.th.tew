import { BASE_URL } from '../../config/env.js'
import RetrospectiveTypes from '../constants/retrospective-types.js'
import AuthorityTypes from '../constants/authority-types.js'

export const getAllUsers = async () => {
  const users = await fetch(`${BASE_URL}/users`)
    .then((res) => res.json())
    // eslint-disable-next-line no-unused-vars
    .catch((err) => null)
  return users ? users : []
}

const getAllUsernames = async () => {
  const users = await getAllUsers()
  return users ? users.map((user) => user.username) : []
}

export const User = {
  username: {
    type: 'string',
    length: 20,
    required: true,
    uniqueIn: getAllUsernames
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

export const Project = {
  name: {
    type: 'string',
    length: 50,
    required: true
  },
  description: {
    type: 'string',
    length: 200
  },
  retrospective_type: {
    type: 'string',
    enum: RetrospectiveTypes,
    required: true
  },
  passkey: {
    type: 'string',
    range: [6, 12],
    required: true
  },
  users: {
    type: 'array',
    items: {
      userId: {
        type: 'string',
        required: true
      },
      authority: {
        type: 'string',
        enum: AuthorityTypes,
        required: true
      }
    },
    required: true
  }
}

export const Meeting = {
  start_date: {
    type: 'string',
    format: {
      regex: /^(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
      simplified: 'YYYY-MM-DDTHH:mm:ss'
    },
    required: true
  },
  end_date: {
    type: 'string',
    format: {
      regex: /^(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
      simplified: 'YYYY-MM-DDTHH:mm:ss'
    },
    required: true
  },
  description: {
    type: 'string',
    length: 100
  },
  projectId: {
    type: 'string',
    required: true
  }
}

export const Feedback = {
  text: {
    type: 'string',
    length: 60,
    required: true
  },
  group: {
    type: 'string',
    required: true
  },
  meetingId: {
    type: 'string',
    required: true
  },
  userId: {
    type: 'string',
    required: true
  }
}

export const Vote = {
  feedbackId: {
    type: 'string',
    required: true
  },
  userId: {
    type: 'string',
    required: true
  }
}
