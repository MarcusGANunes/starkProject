const express = require('express')
const router = express.Router()

// importing jobs controller method
const { createBoleto, getBoletoPDF } = require('../controllers/boletoController')

router.route('/boleto').post(createBoleto)
router.route('/getBoletoPDF/:id').get(getBoletoPDF)
router.route('/sendMailBoleto').get(sendMailBoleto)


module.exports = router