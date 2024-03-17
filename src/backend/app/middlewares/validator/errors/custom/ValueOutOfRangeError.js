class ValueOutOfRangeError extends Error {
  /**
   * @param {string | number} value - The value that is out of range
   * @param {string} field - The field that the value is out of range for
   * @param {[number, number]} range - The range of the field
   */
  constructor(value, field, range) {
    super(`${value} is out of range ${JSON.stringify(range)} for field '${field}'`)
    this.name = 'ValueOutOfRangeError'
    this.value = value
    this.field = field
    this.range = range
  }
}

export default ValueOutOfRangeError
