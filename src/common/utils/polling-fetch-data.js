//provide for meeting fetch
const intervalTime = 5000 // Interval time in milliseconds

/**
 *
 * @param {Function} callback - callback function, fetch data function, that recieve (endpoint, body) param.
 * @param {Boolean} stopSignal - stop polling signal, default is False.
 * @param {string} endpoint - endpoint for fetch data.
 * @param {Object} data - data object that used to send to backend.
 */
function pollingData(callback, stopSignal = false, endpoint, data) {
  let i = 0
  let polling = setInterval(async function () {
    console.log(i)
    if (stopSignal) {
      // clear interval loop
      console.log('Stop polling data')
      clearInterval(polling)
    }
    await callback(endpoint, data)
    i++
  }, intervalTime)
}
/* // template code for testing
const fetchData = async (endpoint, data) => {
  const res = await Provider.request(endpoint, { body: JSON.stringify(data) })
  console.log(res)
  console.log(res.ok)
  const returnedData = await res.json()
  console.log(returnedData)
}

const userdata = {
  username: 'BomScoob',
  password: 'bitadmin'
}
pollingData(fetchData, false, ACCOUNT_ENDPOINTS.login, userdata)
*/

export default pollingData
