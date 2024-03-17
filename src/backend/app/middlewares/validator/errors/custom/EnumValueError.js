class EnumValueError extends Error {
  /**
   * @param {string | number | boolean | T[]} value - The value that is not in the enum
   * @param {string} field - The field that the value is not in the enum for
   * @param {Object<string, T>} enumValues - The enum values for the field
   */
  constructor(value, field, enumValues) {
    super(`${value} is not in the enum ${JSON.stringify(enumValues)} for field '${field}'`)
    this.name = 'EnumValueError'
    this.value = value
    this.field = field
    this.enumValues = enumValues
  }
}

export default EnumValueError
