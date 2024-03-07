import { RetrospectiveTypes } from '../constants/retrospective-types.js'
import { Meeting } from './Meeting.js'
import { User } from './User.js'

const Project = {
  name: {
    type: 'string',
    length: 50,
    required: true
  },
  description: {
    type: 'string',
    length: 100
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
  meetings: {
    type: 'array',
    items: Meeting
  },
  users: {
    type: 'array',
    items: User,
    required: true
  }
}

export default Project
