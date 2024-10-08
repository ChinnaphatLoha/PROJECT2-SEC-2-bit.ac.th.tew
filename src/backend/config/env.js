// * Environment variables

export const BASE_URL = import.meta.env?.VITE_BASE_URL ?? 'http://localhost:3001'

export const endpoints = {
  user: 'users',
  project: 'projects',
  meeting: 'meetings',
  feedback: 'feedbacks',
  vote: 'votes'
}
