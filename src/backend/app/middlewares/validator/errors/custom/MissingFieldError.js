class MissingFieldError extends Error {
  /**
   * @param {string} field - The field that is missing
   */
  constructor(field) {
    super(`Missing required field '${field}'`)
    this.name = 'MissingFieldError'
    this.field = field
  }
}

export default MissingFieldError
