const boletoService = require('./boletoService')
const moment = require('moment')



const main = async () => {
  console.log(moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'))

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