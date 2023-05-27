# Intruções

1. Rode o script ```npm run createKeys``` para gerar o par de chaves para a api do Starkbank. As variáveis serão armazenadas em ./keys.
2. Defina as variáveis de ambiente em ./config/config.env, para isso substitua os valores:
     ```
      PORT=3000
      EMAIL_SENDER=value
      SENDER_PASSWORD=value
      SLACK_BOT_TOKEN=value
      SLACK_SIGNING_SECRET=value
      URL_ENDPOINT=http://localhost:3000/
     ```
     OBS: No momento, o app está configurado apenas para execução local.
3. Os boletos em PDF gerados ficam armazenados em ./boletoFiles
4. Use o script ```npm run dev```
