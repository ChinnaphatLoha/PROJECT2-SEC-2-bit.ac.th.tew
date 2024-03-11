class DuplicateValueError extends Error {
  /**
   * @param {string | number | boolean | T[]} value - The value that is duplicated
   * @param {string} field - The field that the value is duplicated in
   */
  constructor(value, field) {
    super(`${value} is already in use for field '${field}'`)
    this.name = 'DuplicateValueError'
    this.value = value
    this.field = field
  }
}

export default DuplicateValueError
