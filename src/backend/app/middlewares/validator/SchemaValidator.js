import SchemaError from './errors/index.js'

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
 * @param {string | number | boolean | Array<T>} value - The value to validate
 */
export const validateNotEmpty = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return value !== '' && value !== null && value !== undefined
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
 * @param {[number, number]} range - The range to validate against
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
export const validateModel = async (model, data) => {
  validateExtraFields(model, data)
  for (const [key, value] of Object.entries(model)) {
    if (!value.required && !data[key]) {
      continue
    }
    if (value.items && value.type === 'array' && Array.isArray(data[key])) {
      for (const item of data[key]) {
        validateModel(value.items, item)
      }
    } else if (value.items && value.type === 'array') {
      throw new SchemaError.TYPE_MISMATCH(key, 'array', data[key])
    }
    if (value.required && !data[key]) {
      throw new SchemaError.MISSING_FIELD(key)
    }
    if (value.required && !validateNotEmpty(data[key])) {
      throw new SchemaError.EMPTY_FIELD(key)
    }
    if (value.type && !validateType(data[key], value.type)) {
      throw new SchemaError.TYPE_MISMATCH(key, value.type, data[key])
    }
    if (value.enum && !validateEnum(data[key], value.enum)) {
      throw new SchemaError.ENUM_VALUE(data[key], key, value.enum)
    }
    if (value.length && !validateLength(data[key], value.length)) {
      throw new SchemaError.VALUE_TOO_LONG(data[key], key, value.length)
    }
    if (value.range && !validateRange(data[key], value.range)) {
      throw new SchemaError.VALUE_OUT_OF_RANGE(data[key], key, value.range)
    }
    if (value.format && !validateFormat(data[key], value.format.regex)) {
      throw new SchemaError.FORMAT_MISMATCH(data[key], key, value.format.simplified)
    }
    if (value.uniqueIn instanceof Function && value.uniqueIn() instanceof Promise) {
      const uniqueSet = await value.uniqueIn()
      if (!validateUnique(data[key], uniqueSet)) {
        throw new SchemaError.DUPLICATE_VALUE(data[key], key)
      }
    } else if (value.uniqueIn && !validateUnique(data[key], value.uniqueIn)) {
      throw new SchemaError.DUPLICATE_VALUE(data[key], key)
    }
  }
  return data
}

class SchemaValidator {
  /**
   * @param {Object<string, Object<string, string | number | boolean | Array<T>>>} model
   */
  constructor(model) {
    /**
     * @type {Object<string, Object<string, string | number | boolean | Array<T>>>}
     */
    this.model = model
  }

  /**
   * @param {Object<string, string | number | boolean | Array<T>>} data
   */
  validate(data) {
    return validateModel(this.model, data)
  }
}

export default SchemaValidator
