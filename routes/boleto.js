const express = require('express')
const router = express.Router()

const { createBoleto, getBoletoPDF, sendMailBoleto } = require('../controllers/boletoController')

router.route('/boleto').post(createBoleto)
router.route('/getBoletoPDF/:id').get(getBoletoPDF)
router.route('/sendMailBoleto/:email/:id').get(sendMailBoleto)

module.exports = router