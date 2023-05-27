const { WebClient } = require('@slack/web-api')
require('dotenv').config()
const token = process.env.SLACK_BOT_TOKEN
const crypto = require('crypto-js')

const slackClient = new WebClient(token)

const sendCode = async (slackId) => {
  const code = parseInt(Math.random() * (999999 - 100000) + 100000)
  const msg = `Olá! Seu token de verificação é ${code}.`
  await slackClient.chat.postMessage({ channel: slackId, text: msg})
  return code.toString()
}


const validateCode = (code, inputCode) => code === crypto.SHA256(inputCode).toString(crypto.enc.Base64)

exports.sendVerificationCode = async (req, res, next) => {
  const slackId = req.body.slackId

  const code = await sendCode(slackId)

  const hash = crypto.SHA256(code)

  res.status(200).json({
    success: true,
    message: 'Code sent',
    hash: hash.toString(crypto.enc.Base64)
  })
}

exports.validateVerificationCode = async (req, res, next) => {
  const code = req.body.code
  const inputCode = req.body.inputCode

  if (validateCode(code, inputCode)) {
    res.status(200).json({
      success: true,
      message: 'Permission granted'
    })
  }
  else {
    res.status(400).json({
      success: false,
      message: 'Wrong code',
    })
  }
}