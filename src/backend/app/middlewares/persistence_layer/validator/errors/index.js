import DuplicateValueError from './custom/DuplicateValueError.js'
import EmptyArrayFieldError from './custom/EmptyArrayFieldError.js'
import EnumValueError from './custom/EnumValueError.js'
import FormatMismatchError from './custom/FormatMismatchError.js'
import MissingFieldError from './custom/MissingFieldError.js'
import TypeMismatchError from './custom/TypeMismatchError.js'
import ValueOutOfRangeError from './custom/ValueOutOfRangeError.js'
import ValueTooLongError from './custom/ValueTooLongError.js'

export default {
  DUPLICATE_VALUE: DuplicateValueError,
  EMPTY_ARRAY_FIELD: EmptyArrayFieldError,
  ENUM_VALUE: EnumValueError,
  FORMAT_MISMATCH: FormatMismatchError,
  MISSING_FIELD: MissingFieldError,
  TYPE_MISMATCH: TypeMismatchError,
  VALUE_OUT_OF_RANGE: ValueOutOfRangeError,
  VALUE_TOO_LONG: ValueTooLongError
}
