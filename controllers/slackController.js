const { WebClient } = require('@slack/web-api')
const { createEventAdapter } = require('@slack/events-api')
require('dotenv').config()
const moment = require('moment')
const signingSecret = process.env.SLACK_SIGNING_SECRET
const token = process.env.SLACK_BOT_TOKEN
const axios = require('axios')

const apiEndpoint = process.env.URL_ENDPOINT
const apiUrl = apiEndpoint + 'api/v1/getTodayScheduledPayments'

const slackClient = new WebClient(token)

const channel = 'U059ZFBJUCR'

const formatMessage = ({ description, type, amount, status}) => `--------------------------------------------\nDescrição: ${description}\nTipo: ${type}\nValor: ${amount/100}\nStatus: ${status}`

exports.postMessage = async (req, res, next) => {
  const intro = `Olá! Segue abaixo os pagamentos do dia ${moment().format('DD/MM/YYYY')}.`
  const centerId = req.body.centerId

  slackClient.chat.postMessage({ channel, text: intro})
  const payments = (await axios.get(apiUrl + `/${centerId}`)).data.todayRequests
  payments.map(payment => slackClient.chat.postMessage({ channel, text: formatMessage(payment)}))
  res.status(200).json({
    success: true,
    message: 'Message sent',
})
}