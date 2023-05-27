const boletoService = require('./boletoService')
const moment = require('moment')
const express = require('express');
const cors = require('cors');



const main = async () => {

  const balance = await boletoService.getBalance()
  console.log(balance)

}

main()