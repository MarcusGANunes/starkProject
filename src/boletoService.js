const starkbank = require('starkbank')
const moment = require('moment')
const { getPrivateKey } = require('../utils/getPrivateKey')

const setUser = async () => {
  const privateKey = await getPrivateKey()
  const project = new starkbank.Project({
    environment: 'sandbox',
    id: '4906495397330944',
    privateKey: privateKey
  });
  starkbank.setUser(project)
}

const getBalance = async () => {
  await setUser()
  return starkbank.balance.get()
}

const createBoleto = async (payload) => {
  await setUser()
  return starkbank.boleto.create([
    {
      amount: payload.amount,
      name: payload.customerName,
      taxId: payload.CNPJ,
      streetLine1: payload.street,
      streetLine2: payload.complement,
      district: payload.district,
      city: payload.city,
      stateCode: payload.state,
      zipCode: payload.zipCode,
      due: payload.due
    }
  ])
}

module.exports = {
  getBalance,
  createBoleto,
}