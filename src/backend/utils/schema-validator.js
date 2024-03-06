/**
 * @param {string} type - The type to validate against
 */
export const validateType = (value, type) => {
  switch (type) {
    case 'string':
      return typeof value === 'string'
    case 'number':
      return typeof value === 'number'
    case 'boolean':
      return typeof value === 'boolean'
    case 'array':
      return Array.isArray(value)
    case 'object':
      return typeof value === 'object'
    default:
      return false
  }
}

/**
 * @param {Object<string, any>} enumObject - The enum-like object to validate against
 */
export const validateEnum = (value, enumObject) => {
  const enumArray = Object.values(enumObject)
  return enumArray.includes(value)
}

/**
 *
 * @param {string} value - The value to validate
 * @param {number} length - The length to validate against
 */
export const validateLength = (value, length) => {
  return value.length <= length
}

/**
 * @param {string | number} value - The value to validate
 * @param {number[]} range - The range to validate against
 */
export const validateRange = (value, [min, max]) => {
  const length = typeof value === 'string' ? value.length : value
  return length >= min && length <= max
}

/**
 * @param {string} value - The value to validate
 * @param {RegExp} format - The format to validate against
 */
export const validateFormat = (value, format) => {
  return format.test(value)
}

/**
 *
 * @param {any} value - The value to validate
 * @param {Array<any>} set - The set of values to check against
 */
export const validateUnique = (value, set) => {
  return !set.includes(value)
}

/**
 * @param {Object<string, Object<string, string | number | boolean | Array<T>>>} model
 * @param {Object<string, string | number | boolean | Array<T>>} data
 */
export const validateExtraFields = (model, data) => {
  for (const [key] of Object.entries(data)) {
    if (!model[key] && key !== 'id') {
      throw new Error(`Extra field: ${key} is not allowed`)
    }
  }
  return true
}

/**
 * @param {Object<string, Object<string, string | number | boolean | Array<T>>>} model
 * @param {Object<string, string | number | boolean | Array<T>>} data
 */
export const validateModel = (model, data) => {
  validateExtraFields(model, data)
  for (const [key, value] of Object.entries(model)) {
    if (!value.required && !data[key]) {
      continue
    }
    if (value.items && value.type === 'array') {
      if (!Array.isArray(data[key])) {
        throw new Error(`Expected array for field: ${key}`)
      } else if (data[key].length === 0 && value.required) {
        throw new Error(`Required field: ${key} cannot be empty`)
      }
      for (const item of data[key]) {
        validateModel(value.items, item)
      }
    }
    if (value.required && !data[key]) {
      throw new Error(`Missing required field: ${key}`)
    }
    if (value.type && !validateType(data[key], value.type)) {
      throw new Error(
        `Type of ${typeof data[key]} does not match expected type: ${value.type} for field: ${key}`
      )
    }
    if (value.enum && !validateEnum(data[key], value.enum)) {
      throw new Error(
        `${data[key]} is not in the enum ${JSON.stringify(value.enum)} for field: ${key}`
      )
    }
    if (value.length && !validateLength(data[key], value.length)) {
      throw new Error(`${data[key]} is too long in length ${value.length} for field: ${key}`)
    }
    if (value.range && !validateRange(data[key], value.range)) {
      throw new Error(`${data[key]} is out of range ${value.range} for field: ${key}`)
    }
    if (value.format && !validateFormat(data[key], value.format.regex)) {
      throw new Error(
        `${data[key]} does not match the format ${value.format.simplified} for field: ${key}`
      )
    }
    if (value.uniqueIn && !validateUnique(data[key], value.uniqueIn)) {
      throw new Error(`${data[key]} is already in use for field: ${key}`)
    }
  }
  return true
}
