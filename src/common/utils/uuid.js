const randomUUID = () => {
  const randomValues = new Uint32Array(1)
  crypto.getRandomValues(randomValues)
  return randomValues[0].toString(16)
}
export default randomUUID
