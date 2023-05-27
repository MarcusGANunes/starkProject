const { WebClient } = require('@slack/web-api')
const { createEventAdapter } = require('@slack/events-api')
require('dotenv').config()
const signingSecret = process.env.SLACK_SIGNING_SECRET
const token = process.env.SLACK_BOT_TOKEN

const slackEvents = createEventAdapter(signingSecret)
const slackClient = new WebClient(token)

await slackEvents.on('app_mention', async (event) => {
  console.log(`Message from ${event.user}: ${event.text}`)
  await slackClient.chat.postMessage({ channel: event.channel, text: 'Texto'})
})
