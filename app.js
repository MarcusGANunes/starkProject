const express = require('express')
const app = express()
const cors = require('cors')

const dotenv = require('dotenv')

app.use(express.json())
app.use(cors())

dotenv.config({path: './config/config.env'})

const middleware = (req, res, next) =>{
    req.newField = 'whats up?'
    next()
}

app.use(middleware)

const boleto = require('./routes/boleto')
const slack = require('./routes/slack')
const payment = require('./routes/payment')
const balance = require('./routes/balance')

app.use('/api/v1', boleto)
app.use('/api/v1', payment)
app.use('/api/v1', slack)
app.use('/api/v1', balance)

const PORT = process.env.PORT
const ENVIRONMENT = process.env.NODE_ENV

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} in ${ENVIRONMENT} mode`)
})