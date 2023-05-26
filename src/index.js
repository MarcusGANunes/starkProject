const starkbank = require('starkbank')
const { getPrivateKey } = require('../utils/getPrivateKey')
const boletoService = require('./boletoService')
const moment = require('moment')



const main = async () => {

  const privateKey = await getPrivateKey()
  const project = new starkbank.Project({
    environment: 'sandbox',
    id: '4906495397330944',
    privateKey: privateKey
  });
  starkbank.setUser(project)
  console.log(starkbank.user)

  const balance = await boletoService.getBalance()
  console.log(balance)

  const failedPayments = await boletoService.getFailedPayments()
  console.log(failedPayments)

  const notEnoughBalance = await boletoService.getInsufficientBalancePaymentFailures()
  console.log(notEnoughBalance)

  const boleto = await boletoService.getBoleto()
  console.log(boleto)

}

main()