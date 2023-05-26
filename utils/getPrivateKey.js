const fs = require('fs')

const getPrivateKey = async () => {
  const keyFile = await fs.readFileSync('./keys/privateKey.json')
  const key = JSON.parse(keyFile)
  return key.privateKey
}

module.exports = {
  getPrivateKey
}