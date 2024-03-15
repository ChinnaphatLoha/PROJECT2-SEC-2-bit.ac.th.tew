class TypeMismatchError extends Error {
  /**
   * @param {string} field - The field that has a type mismatch
   * @param {string} expectedType - The expected type for the field
   * @param {string | number | boolean | T[]} value - The value that has a type mismatch
   */
  constructor(field, expectedType, value) {
    super(
      `Type of ${typeof value} does not match expected type: ${expectedType} for field '${field}'`
    )
    this.name = 'TypeMismatchError'
    this.field = field
    this.expectedType = expectedType
    this.actualType = typeof value
  }
}

export default TypeMismatchError
