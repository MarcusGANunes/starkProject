const starkbank = require('starkbank')
const fs = require('fs').promises;
const moment = require('moment')
const { getPrivateKey } = require('../utils/getPrivateKey')
const nodemailer = require('nodemailer');

const setUser = async () => {
  const privateKey = await getPrivateKey()
  const project = new starkbank.Project({
    environment: 'sandbox',
    id: '4906495397330944',
    privateKey: privateKey
  });
  starkbank.setUser(project)
}

exports.createBoleto = async (req, res, next) => {
  const payload = req.body
  await setUser()

  const boleto = await starkbank.boleto.create([
    {
      amount: payload.amount,
      name: payload.name,
      taxId: payload.cnpj,
      streetLine1: payload.streetLine1,
      streetLine2: payload.streetLine2,
      district: payload.district,
      city: payload.city,
      stateCode: payload.stateCode,
      zipCode: payload.zipCode,
      due: payload.due
    }
  ])
  res.status(200).json({
      success: true,
      message: 'This route will display all jobs in future',
      boleto
  })
}

exports.getBoletoPDF = async (req, res, next) => {
  const id = req.params.id
  await setUser()

  const file = await starkbank.boleto.pdf(id, { layout: 'default' })
  await fs.writeFile(`./boletoFiles/boleto-${id}.pdf`, file)
  res.status(200).json({
    success: true,
    message: 'This route will display all jobs in future',
  })
}

exports.sendMailBoleto = async (req, res, next) => {
  const id = req.params.id
  // Configurar o transportador de e-mail
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'acreandfriends@outlook.com',
      pass: 'acraoeamigos123',
    },
  });

  // Definir as informações do e-mail
  let mailOptions = {
    from: 'acreandfriends@outlook.com',
    to: 'cauetdamasceno@outlook.com',
    subject: 'Envio de PDF',
    text: 'Olá, Segue em anexo o PDF que você solicitou.',
    attachments: [
      {
        filename: `boleto-${id}`,
        path: `./boletoFiles/boleto-${id}.pdf`,
      },
    ],
  };

  // Enviar o e-mail
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado: ', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}