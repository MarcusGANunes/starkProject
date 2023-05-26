const starkbank = require('starkbank')
const moment = require('moment')

const getBalance = () => starkbank.balance.get()

const getFailedPayments = async () => {
  const payments = await starkbank.boletoPayment.query({
    status: 'failed',
    due: moment().utc().format()
  })
  const failedPayments = []
  for await (let payment of payments) {
    failedPayments.push(payment);
  }
  return failedPayments
}

const getBoleto = () => starkbank.boleto.get('5471095918428160')

const getInsufficientBalancePaymentFailures = async () => {
  const allFailedPayments = await getFailedPayments()
  const balance = await getBalance()
  const payments = allFailedPayments.filter(payment => payment.amount > balance)
  return payments
}

const retryFailedPayment = async (cnpj, line, scheduled) => {
  let payment = await starkbank.boletoPayment.create([
    {
        taxId: cnpj,
        description: 'retrying boleto payment',
        scheduled,
        line,
        tags: []
    }
  ])
  return payment
}

module.exports = {
  getBalance,
  getFailedPayments,
  getInsufficientBalancePaymentFailures,
  getBoleto,
  retryFailedPayment
}