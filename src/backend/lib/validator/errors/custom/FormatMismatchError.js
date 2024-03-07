class FormatMismatchError extends Error {
  /**
   * @param {string | number | boolean | T[]} value - The value that does not match the format
   * @param {string} field - The field that the value does not match the format for
   * @param {string} format - The description of the format
   */
  constructor(value, field, format) {
    super(`${value} does not match the format ${format} for field '${field}'`)
    this.name = 'FormatMismatchError'
    this.value = value
    this.field = field
    this.format = format
  }
}

export default FormatMismatchError
