// * The repository for the JSON Server API, providing the CRUD operations.

class JsonServerRepository {
  constructor(BASE_URL, endpoint) {
    this.BASE_URL = BASE_URL
    this.endpoint = endpoint
  }

  _stringifyQuery(query) {
    return Object.entries(query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }

  async findAll() {
    const response = await fetch(`${this.BASE_URL}/${this.endpoint}`)
    return response.json()
  }

  async findById(id) {
    const response = await fetch(`${this.BASE_URL}/${this.endpoint}/${id}`)
    return response.json()
  }

  async findMany(query) {
    const queryString = this._stringifyQuery(query)
    const response = await fetch(`${this.BASE_URL}/${this.endpoint}?${queryString}`)
    return response.json()
  }

  async findFirst(query) {
    const data = await this.findMany(query)
    return data[0] ? data[0] : null
  }

  async create(data) {
    const response = await fetch(`${this.BASE_URL}/${this.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async update(query, data) {
    const id = query.id ? query.id : await this.findFirst(query).then((data) => data.id)
    const response = await fetch(`${this.BASE_URL}/${this.endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async delete(query) {
    const id = query.id ? query.id : await this.findFirst(query).then((data) => data.id)
    const response = await fetch(`${this.BASE_URL}/${this.endpoint}/${id}`, {
      method: 'DELETE'
    })
    return response.json()
  }
}

export default JsonServerRepository
