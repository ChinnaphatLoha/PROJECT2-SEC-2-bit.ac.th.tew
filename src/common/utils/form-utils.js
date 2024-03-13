const getFormUtils = () => {
  const obj = Object.create(null) // or const obj = {}

  /**
   * 
   * @param {string} key - Attribute or Field name of target object.
   * @param {Event} event - target event object.
   */
  const setTextValue = (key, event) => {
    obj[key] = event.value.trim()
  }

  /**
   * 
   * @returns Object that contain value in form.
   */
  const getObject = () => {
    return obj
  }

  return {
    setTextValue,
    getObject
  }
}

export default getFormUtils
