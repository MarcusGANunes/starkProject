const starkbank = require('starkbank')
const fs = require('fs').promises;
const { getPrivateKey } = require('../utils/getPrivateKey')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

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
  const payload = req.body || req.body.data
  console.log(payload)
  await setUser()

  const boleto = await starkbank.boleto.create([
    {
      amount: payload.amount,
      name: payload.name,
      taxId: payload.taxId,
      streetLine1: payload.streetLine1,
      streetLine2: payload.streetLine2,
      district: payload.district,
      city: payload.city,
      stateCode: payload.stateCode,
      zipCode: payload.zipCode,
      due: payload.due
    }
  ])
  console.log(boleto)
  res.status(200).json({
      success: true,
      message: 'Boleto criado com sucesso',
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
    message: 'Boleto gerado com sucesso',
  })
}

exports.sendMailBoleto = async (req, res, next) => {
  const id = req.params.id
  const sender = process.env.EMAIL_SENDER
  const senderPassword = process.env.SENDER_PASSWORD
  const receiver = req.params.email//'kalil1@criacaodeboleto-hacka23.sandbox.starkbank.com'
  console.log(id, receiver)

  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: sender,
      pass: senderPassword,
    },
  });

  let mailOptions = {
    from: sender,
    to: receiver,
    subject: 'Envio de PDF',
    text: 'Olá, Segue em anexo o PDF que você solicitou.',
    attachments: [
      {
        filename: `boleto-${id}`,
        path: `./boletoFiles/boleto-${id}.pdf`,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: `Email enviado com sucesso para ${receiver}`,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Falha ao enviar o email',
      error
    })
  }
}