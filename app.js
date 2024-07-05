// const { Client, GatewayIntentBits } = require('discord.js');
// const axios = require('axios');
// const cron = require('node-cron');
// require('dotenv').config();

// const client = new Client({
//     intents: [
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMessages,
//         GatewayIntentBits.MessageContent,  // Required to read the content of messages
//         GatewayIntentBits.GuildMembers,    // Required to track member updates
//         GatewayIntentBits.GuildPresences   // Required to track presence updates
//     ]
// });

// const TOKEN = process.env.DISCORD_TOKEN;
// const API_KEY = process.env.API_KEY;  // Your financial data API key
// const CHANNEL_ID = '1247834949579702273'; // Replace with your channel ID

// client.once('ready', () => {
//     console.log('Bot is online!');

//     // Schedule a task to run every 15 minutes
//     cron.schedule('*/1 * * * *', async () => {
//         const symbol = 'AAPL';  // Example stock symbol
//         try {
//             const response = await axios.get(`https://www.alphavantage.co/query`, {
//                 params: {
//                     function: 'GLOBAL_QUOTE',
//                     symbol: symbol,
//                     apikey: API_KEY
//                 }
//             });

//             const data = response.data['Global Quote'];
//             if (!data) {
//                 console.log('Invalid stock symbol or API error.');
//                 return;
//             }

//             const price = data['05. price'];
//             const channel = client.channels.cache.get(CHANNEL_ID);  // Get the channel by ID
//             if (channel) {
//                 channel.send(`The current price of ${symbol.toUpperCase()} is $${price}`);
//             } else {
//                 console.log('Channel not found.');
//             }
//         } catch (error) {
//             console.error('An error occurred while fetching the data.', error);
//         }
//     });
// });

// client.on('messageCreate', async message => {
//     if (!message.content.startsWith(PREFIX) || message.author.bot) return;

//     const args = message.content.slice(PREFIX.length).trim().split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === 'price') {
//         const symbol = args[0];
//         if (!symbol) {
//             return message.channel.send('Please provide a stock symbol.');
//         }

//         try {
//             const response = await axios.get(`https://www.alphavantage.co/query`, {
//                 params: {
//                     function: 'GLOBAL_QUOTE',
//                     symbol: symbol,
//                     apikey: API_KEY
//                 }
//             });

//             const data = response.data['Global Quote'];
//             if (!data) {
//                 return message.channel.send('Invalid stock symbol or API error.');
//             }

//             const price = data['05. price'];
//             message.channel.send(`The current price of ${symbol.toUpperCase()} is $${price}`);
//         } catch (error) {
//             console.error(error);
//             message.channel.send('An error occurred while fetching the data.');
//         }
//     }
// });

// client.login(TOKEN);

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
console.log(12312312);