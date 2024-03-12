export const generateSessionId = (userId) => {
  // STUB - Implement real session ID generation
  return `${userId}-${Date.now()}`
}

export const getSessionUserId = (sessionId) => {
  // STUB - Implement real session ID parsing
  return sessionId.split('-')[0]
}
