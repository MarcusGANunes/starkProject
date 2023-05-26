const fs = require('fs')
const starkbank = require('starkbank')

const createKeys = async () => {
  const [privateKey, publicKey] = starkbank.key.create('../keys');
  Promise.all[
    fs.writeFileSync('./keys/privateKey.json', JSON.stringify({ privateKey })),
    fs.writeFileSync('./keys/publicKey.pem', publicKey)
  ]
}

createKeys()
