export const getShortISOStringInUserTimezone = (date) => {
  const dateObj = new Date(date)
  const offset = dateObj.getTimezoneOffset()
  dateObj.setMinutes(dateObj.getMinutes() - offset)
  return dateObj.toISOString().slice(0, 16)
}

export const formatDateTime = (date, option) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const year = date.getFullYear()
  const day = date.getDate().toString().padStart(2, '0') // Ensure two-digit day
  const monthIndex = date.getMonth()
  const monthName = monthNames[monthIndex]
  const hour = date.getHours() % 12 // Get 12-hour hour
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const meridian = date.getHours() >= 12 ? 'PM' : 'AM'
  if (option === '[date, time]')
    return [
      `${day} ${monthName} ${year}`,
      `${hour.toString().padStart(2, '0')}.${minutes} ${meridian}`
    ]
  return `${day} ${monthName} ${year} ${hour.toString().padStart(2, '0')}.${minutes} ${meridian}`
}
