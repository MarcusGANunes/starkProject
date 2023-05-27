# Intruções

1. Rode o script ```npm run createKeys```. As variáveis serão armazenadas em ./keys.
2. Defina as variáveis de ambiente em ./config/config.env, para isso substitua os valores:
  ```
    EMAIL_SENDER=value
    SENDER_PASSWORD=value
    SLACK_BOT_TOKEN=value
    SLACK_SIGNING_SECRET=value
    URL_ENDPOINT=value
  ```
  O valor de URL_ENDPOINT corresponde ao servidor do app.
3. Os boletos em PDF gerados ficam armazenados em ./boletoFiles