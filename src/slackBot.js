const axios = require('axios');
require('dotenv').config()
const { App } = require('@slack/bolt');
const signingSecret = process.env.SLACK_SIGNING_SECRET
const botToken = process.env.SLACK_BOT_TOKEN
console.log(signingSecret, botToken)
const app = new App({
  signingSecret: signingSecret,
  token: botToken,
});

(async () => { 
  await app.start(process.env.PORT || 12000);

  app.message('Citação', async ({ message, say }) => {
    let resp = await axios.get(`https://api.quotable.io/random`);
    const quote = resp.data.content;
    await say(`Hello, <@${message.user}>, ${quote}`);
  });
  console.log(`⚡ Bolt app is running!`);
})();
