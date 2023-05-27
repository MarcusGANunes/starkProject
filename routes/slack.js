const express = require('express')
const router = express.Router()

const { postDailyMessage, alertBelowBalance} = require('../controllers/slackController')

router.route('/postDailyMessage').post(postDailyMessage)
router.route('/alertBelowBalance').post(alertBelowBalance)

module.exports = router