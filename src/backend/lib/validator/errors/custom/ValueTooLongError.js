class ValueTooLongError extends Error {
  /**
   * @param {string} value - The value that is too long
   * @param {string} field - The field that the value is too long for
   * @param {number} maxLength - The maximum length of the field
   */
  constructor(value, field, maxLength) {
    super(`${value} is too long in length ${value.length} (max ${maxLength}) for field '${field}'`)
    this.name = 'ValueTooLongError'
    this.value = value
    this.field = field
    this.maxLength = maxLength
  }
}

export default ValueTooLongError
