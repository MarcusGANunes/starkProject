const express = require('express')
const router = express.Router()

const { postMessage } = require('../controllers/slackController')

router.route('/postMessage').post(postMessage)

module.exports = router