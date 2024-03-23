export const getShortISOStringInUserTimezone = (date) => {
    const dateObj = new Date(date)
    const offset = dateObj.getTimezoneOffset()
    dateObj.setMinutes(dateObj.getMinutes() - offset)
    return dateObj.toISOString().slice(0, 16)
}
