export const createErrorResponse = (status, message) => {
  return {
    status,
    message,
    timestamp: new Date().toISOString()
  }
}
