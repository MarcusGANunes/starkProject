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

const retryFailedPayment = async () => {
  let payments = await starkbank.boletoPayment.create([
    {
        taxId: '012.345.678-90',
        description: 'take my money',
        scheduled: '2023-03-13',
        line: '34191.09008 64694.017308 71444.640008 1 96610000014500',
        tags: ['take', 'my', 'money'],
    },
    {
        taxId: '012.345.678-90',
        description: 'take my money one more time',
        scheduled: '2023-03-14',
        barCode: '34191972300000289001090064694197307144464000',
        tags: ['again'],
    },
])
}

  // const getTodayPendingpayments = () => 

  // let boleto = await starkbank.boleto.get('5054323138494464')
  // console.log(boleto);

module.exports = {
  getBalance,
  getFailedPayments,
  getInsufficientBalancePaymentFailures,
  getBoleto
}