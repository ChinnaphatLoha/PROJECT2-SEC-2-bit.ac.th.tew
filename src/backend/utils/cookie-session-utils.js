const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
  'encrypt',
  'decrypt'
])
const data = new TextEncoder().encode('bitauth')

export const generateToken = async (key, data) => {
  return crypto.subtle.encrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, data)
}

export const decryptToken = async (key, token) => {
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, token)
}

const token = await generateToken(key, data)
const decryptedData = await decryptToken(key, token)
console.log(new TextDecoder().decode(decryptedData))
