const express = require('express')
const app = express()

const dotenv = require('dotenv')

app.use(express.json())

// setting up environment variables
dotenv.config({path: './config/config.env'})

// creating the first middleware
const middleware = (req, res, next) =>{
    req.newField = 'whats up?'
    next()
}

app.use(middleware)

// importing all routes
const boleto = require('./routes/boleto')

app.use('/api/v1', boleto)

const PORT = process.env.PORT
const ENVIRONMENT = process.env.NODE_ENV

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} in ${ENVIRONMENT} mode`)
})