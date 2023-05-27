const starkbank = require('starkbank')
const moment = require('moment')
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


exports.getTodayScheduledPayments = async (req, res, next) => {
  await setUser()

  const centerId = req.params.id

  const requestsAsyncArray = await starkbank.paymentRequest.query({centerId})
  const requests = []
  
  for await (let request of requestsAsyncArray){
    requests.push(request)
  }

  const todayRequests = requests.filter(request => request.due.includes(moment.utc().format('YYYY-MM-DD')))

  res.status(200).json({
    success: true,
    message: `Pagamentos para o centro de pagamentos ${centerId} com vencimento no dia de hoje`,
    todayRequests
  })
}