const Meeting = {
  start_date: {
    type: 'string',
    format: {
      regex: /^(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
      simplified: 'YYYY-MM-DDTHH:mm:ss'
    },
    required: true
  },
  end_date: {
    type: 'string',
    format: {
      regex: /^(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
      simplified: 'YYYY-MM-DDTHH:mm:ss'
    },
    required: true
  },
  description: {
    type: 'string',
    length: 100
  },
  feedback: {
    type: 'array'
  }
}

export default Meeting
