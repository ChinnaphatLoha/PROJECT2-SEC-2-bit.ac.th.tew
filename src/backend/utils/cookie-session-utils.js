export const generateSessionId = (userId) => {
  return `${userId}-${Date.now()}`
}

export const getSessionUserId = (sessionId) => {
  return sessionId.split('-')[0]
}
