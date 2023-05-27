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

// const channel = 'U059ZFBJUCR'

const formatValue = (value) => value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

const formatMessage = ({ description, payment, amount, status}) => `--------------------------------------------\nDescrição: ${description}\nCódigo de Barras: ${payment.line}\nValor: R$ ${formatValue(amount/100)}\nStatus: ${status}`

const dailyPostFunction = async (centerId, slackId) => {
  const balance = (await axios.get(balanceApiUrl)).data.balance
  const intro = `Olá! Seguem abaixo os boletos cujos vencimentos estão para o dia de hoje (${moment().format('DD/MM/YYYY')}).\nTais pagamentos são referentes ao centro de pagamentos de id ${centerId}.\nSeu saldo atual é de R$ ${formatValue(balance)}.`
  await slackClient.chat.postMessage({ channel: slackId, text: intro})
  const payments = (await axios.get(scheduledPaymentsApiUrl + `/${centerId}`)).data.todayRequests
  payments.map(payment => slackClient.chat.postMessage({ channel: slackId, text: formatMessage(payment)}))
}

const sendAlert = async (minBalance, slackId) => {
  const balance = (await axios.get(balanceApiUrl)).data.balance
  const msg = `Atenção! Seu saldo está abaixo do limite configurado de R$ ${formatValue(minBalance)}.`
  if (balance < minBalance) await slackClient.chat.postMessage({ channel: slackId, text: msg})
}

exports.postDailyMessage = async (req, res, next) => {
  const centerId = req.body.centerId
  const slackId = req.body.slackId

  cron.schedule('*/2 * * * *', () => dailyPostFunction(centerId, slackId));

  res.status(200).json({
    success: true,
    message: 'Message sent',
})
}

exports.alertBelowBalance = async (req, res, next) => {
  const minBalance = req.body.minBalance
  const slackId = req.body.slackId

  cron.schedule('*/1 * * * *', () => sendAlert(minBalance, slackId));

  res.status(200).json({
    success: true,
    message: 'Message sent'
})
}