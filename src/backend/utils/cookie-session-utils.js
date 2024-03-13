import cryptoKey from '../app/constants/crypto-key.js'

const encodeData = (data) => new TextEncoder().encode(data)
const decodeData = (data) => new TextDecoder().decode(data)

export const generateToken = async (data) => {
  const encodedData = encodeData(data)
  const tokenArrayBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    cryptoKey,
    encodedData
  )
  const tokenUint8Array = new Uint8Array(tokenArrayBuffer)
  const tokenBase64 = btoa(String.fromCharCode.apply(null, tokenUint8Array))
  return tokenBase64
}

export const decryptToken = async (token) => {
  const tokenUint8Array = new Uint8Array(
    atob(token)
      .split('')
      .map((c) => c.charCodeAt(0))
  )
  const tokenArrayBuffer = crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    cryptoKey,
    tokenUint8Array
  )
  const tokenData = await tokenArrayBuffer
  return decodeData(tokenData)
}

export const setCookie = (name, value, days) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

export const getCookie = (name) => {
  const cookieName = `${name}=`
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length)
    }
  }
  return ''
}
