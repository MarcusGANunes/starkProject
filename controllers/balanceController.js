const starkbank = require('starkbank')
const { getPrivateKey } = require('../utils/getPrivateKey')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const setUser = async () => {
  const privateKey = await getPrivateKey()
  const project = new starkbank.Project({
    environment: 'sandbox',
    id: '4906495397330944',
    privateKey: privateKey
  });
  starkbank.setUser(project)
}
  
exports.getBalance = async (req, res, next) => {
    await setUser()
  
    const balance = ((await starkbank.balance.get()).amount)/100

    res.status(200).json({
      success: true,
      balance
    })
}