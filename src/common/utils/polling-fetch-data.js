import Provider from '@/api/provider'
import { ACCOUNT_ENDPOINTS } from '../constants/uri-endpoints'

//provide for meeting fetch
const intervalTime = 5000 // Interval time in milliseconds

function pollingData(callback, stopSignal, endpoint, body) {
  let i = 0
  let polling = setInterval(async function () {
    console.log(i)
    if (stopSignal) {
      // clear interval loop
      console.log('last polling')
      clearInterval(polling)
      callback(endpoint, body)
    }
    await callback(endpoint, body)
    i++
  }, intervalTime)
}

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

export default pollingData
