const { WebClient } = require('@slack/web-api')
const { createEventAdapter } = require('@slack/events-api')
require('dotenv').config()
const signingSecret = process.env.SLACK_SIGNING_SECRET
const token = process.env.SLACK_BOT_TOKEN

// const slackEvents = createEventAdapter(signingSecret)
const slackClient = new WebClient(token)

const chan = 'U059ZFBJUCR'

// const formatTodayBoletos = ()

exports.postMessage = async (req, res, next) => {
  console.log(req.body)
  await slackClient.chat.postMessage({ channel: chan, text: req.body.text})
  res.status(200).json({
    success: true,
    message: 'Message',
})
}