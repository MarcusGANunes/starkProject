const express = require('express')
const router = express.Router()

const { sendVerificationCode, validateVerificationCode} = require('../controllers/authController')

router.route('/sendVerificationCode').post(sendVerificationCode)
router.route('/validateVerificationCode').post(validateVerificationCode)

module.exports = router