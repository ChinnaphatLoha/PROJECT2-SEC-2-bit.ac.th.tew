//provide for meeting fetch
const intervalTime = 1000 // Interval time in milliseconds

function pollingData(limit, callback) {
  let i = 0
  let polling = setInterval(function () {
    console.log(i)
    if (i === limit - 1) {
      // clear interval loop
      clearInterval(polling)
      callback('http://localhost:3001/users')
    }
    i++
  }, intervalTime)
}

const fetchData = async (url) => {
  const data = await fetch(url)
  console.log(data)
}

pollingData(3, fetchData)