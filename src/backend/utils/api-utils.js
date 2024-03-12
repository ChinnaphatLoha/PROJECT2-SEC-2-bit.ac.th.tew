export const extractEndpointToObject = (endpoint) => {
  const endpointArray = endpoint.split('?')
  endpoint = endpointArray[0]
  const query = endpointArray[1]
  return { endpoint, query }
}

export const extractQueryParams = (queryString) => {
  const queryParams = {}
  const pairs = queryString.split('&')
  for (const pair of pairs) {
    const [key, value] = pair.split('=')
    queryParams[decodeURIComponent(key)] = decodeURIComponent(value)
  }
  return queryParams
}
