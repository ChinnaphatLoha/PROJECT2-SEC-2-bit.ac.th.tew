import Provider from '@/api/provider'

//provide for meeting fetch
const intervalTime = 5000 // Interval time in milliseconds

/**
 *
 * @param {string} endpoint
 * @param {Object} body
 * @param {Object} returnObject - object that to store return data
 */
export const usePollingFetch = async (endpoint, body = null, returnObject) => {
  // Function to fetch data
  const fetchDataAndUpdate = async () => {
    const data = await fetch(endpoint)
    // const res = await Provider.request(endpoint, body)
    // const data = res.ok ? await res.json() : null
    returnObject.body = data
    // if (data?.hasChange === true) {
    //   returnObject.body = data.body
    // } else {
    //   returnObject.body = null
    // }
  }

  // Initial fetch
  await fetchDataAndUpdate()

  // Fetch data at intervals
  setInterval(fetchDataAndUpdate, intervalTime)
}
