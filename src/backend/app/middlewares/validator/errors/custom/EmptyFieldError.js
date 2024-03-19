class EmptyFieldError extends Error {
  /**
   * @param {string} field - The field that is empty
   */
  constructor(field) {
    super(`Required field '${field}' cannot be empty`)
    this.name = 'EmptyFieldError'
    this.field = field
  }
}

export default EmptyFieldError
