//NOTE - This is a temporary file to test the API.

const BASE_URL = 'http://localhost:3001'

export const getData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`)
  return response.json()
}

export const getDataById = async (endpoint, id) => {
  const response = await fetch(`${BASE_URL}/${endpoint}/${id}`)
  return response.json()
}

export const getEmbedData = async (endpoint, ...embedObjects) => {
  const embedString = embedObjects.join('&_embed=')
  const response = await fetch(`${BASE_URL}/${endpoint}?_embed=${embedString}`)
  return response.json()
}

export const getEqualData = async (endpoint, query) => {
  const queryArray = Object.entries(query).map(([key, value]) => `${key}=${value}`)
  const queryString = queryArray.join('&')
  const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`)
  return response.json()
}
