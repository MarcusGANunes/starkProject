const { WebClient } = require('@slack/web-api')
const { createEventAdapter } = require('@slack/events-api')
require('dotenv').config()
const moment = require('moment')
const signingSecret = process.env.SLACK_SIGNING_SECRET
const token = process.env.SLACK_BOT_TOKEN
const axios = require('axios')
const cron = require('node-cron')

const apiEndpoint = process.env.URL_ENDPOINT
const scheduledPaymentsApiUrl = apiEndpoint + 'api/v1/getTodayScheduledPayments'
const balanceApiUrl = apiEndpoint + 'api/v1/getBalance'

const slackClient = new WebClient(token)

const channel = 'U059ZFBJUCR'

const formatMessage = ({ description, type, amount, status}) => `--------------------------------------------\nDescrição: ${description}\nTipo: ${type}\nValor: R$ ${amount/100}\nStatus: ${status}`

const dailyPostFunction = async (centerId) => {
  const intro = `Olá! Segue abaixo os pagamentos do dia ${moment().format('DD/MM/YYYY')} para o centro de pagamentos de id ${centerId}.`
  await slackClient.chat.postMessage({ channel, text: intro})
  const payments = (await axios.get(scheduledPaymentsApiUrl + `/${centerId}`)).data.todayRequests
  payments.map(payment => slackClient.chat.postMessage({ channel, text: formatMessage(payment)}))
}

const sendAlert = async (minBalance) => {
  const balance = (await axios.get(balanceApiUrl)).data.balance
  console.log(balance, minBalance)
  const msg = `Atenção! Seu saldo está abaixo do limite configurado de R$ ${minBalance/100}`
  if (balance < minBalance) await slackClient.chat.postMessage({ channel, text: msg})
}

exports.postDailyMessage = async (req, res, next) => {
  const centerId = req.body.centerId

  cron.schedule('*/2 * * * *', () => dailyPostFunction(centerId));

  res.status(200).json({
    success: true,
    message: 'Message sent',
})
}

exports.alertBelowBalance = async (req, res, next) => {
  const minBalance = req.body.minBalance

  cron.schedule('*/1 * * * *', () => sendAlert(minBalance));

  res.status(200).json({
    success: true,
    message: 'Message sent'
})
}