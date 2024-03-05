// * The repository for the JSON Server API, providing the CRUD operations.

export class JsonServerRepository {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL
  }

  async getData(endpoint) {
    const response = await fetch(`${this.BASE_URL}/${endpoint}`)
    return response.json()
  }

  async getDataById(endpoint, id) {
    const response = await fetch(`${this.BASE_URL}/${endpoint}/${id}`)
    return response.json()
  }

  async getEmbedData(endpoint, ...embedObjects) {
    const embedString = embedObjects.join('&_embed=')
    const response = await fetch(`${this.BASE_URL}/${endpoint}?_embed=${embedString}`)
    return response.json()
  }

  async getEqualData(endpoint, query) {
    const queryArray = Object.entries(query).map(([key, value]) => `${key}=${value}`)
    const queryString = queryArray.join('&')
    const response = await fetch(`${this.BASE_URL}/${endpoint}?${queryString}`)
    return response.json()
  }
}
