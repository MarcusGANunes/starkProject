const express = require('express')
const router = express.Router()

const { getTodayScheduledPayments } = require('../controllers/paymentController')

router.route('/getTodayScheduledPayments/:id').get(getTodayScheduledPayments)

module.exports = router