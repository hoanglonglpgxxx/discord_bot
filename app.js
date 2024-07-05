const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
// require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const TOKEN = process.env.DISCORD_TOKEN;
const API_KEY = process.env.API_KEY;  // Your financial data API key
const PREFIX = '!';  // Command prefix

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'price') {
    const symbol = args[0];
    if (!symbol) {
      return message.channel.send('Please provide a stock symbol.');
    }

    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_KEY
        }
      });

      const data = response.data['Global Quote'];
      if (!data) {
        return message.channel.send('Invalid stock symbol or API error.');
      }

      const price = data['05. price'];
      message.channel.send(`The current price of ${symbol.toUpperCase()} is $${price}`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching the data.');
    }
  }
});

client.login(TOKEN);