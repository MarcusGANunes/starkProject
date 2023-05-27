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

const getFailedPayments = async () => {
  await setUser()
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

const getBoleto = async () => {
  await setUser()
  return starkbank.boleto.get('5471095918428160')
}

const getInsufficientBalancePaymentFailures = async () => {
  await setUser()
  const allFailedPayments = await getFailedPayments()
  const balance = await getBalance()
  const payments = allFailedPayments.filter(payment => payment.amount > balance)
  return payments
}

const retryFailedPayment = async (cnpj, line, scheduled) => {
  await setUser()
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