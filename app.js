const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.DISCORD_TOKEN;
const API_KEY = process.env.API_KEY;  // Your financial data API key
const PREFIX = '!';  // Command prefix

// Abstracted command execution logic
async function executeCommand(command, args, channel) {
  if (command === 'price') {
    const symbol = args[0];
    if (!symbol) {
      channel.send('Please provide a stock symbol.');
      return;
    }

    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_KEY
        }
      });
      // Assuming you process the response and send a message back
      channel.send(`Price for ${symbol}: ...`); // Simplified response
    } catch (error) {
      console.error('Failed to fetch price', error);
      channel.send('Failed to fetch stock price.');
    }
  }
}

client.once('ready', () => {
  console.log('Bot is online!');
  const channelId = 'YOUR_CHANNEL_ID'; // Replace with your channel ID
  const channel = client.channels.cache.get(channelId);
  if (!channel) {
    console.error('Channel not found');
    return;
  }

  // Schedule the command execution every 30 minutes
  setInterval(() => {
    executeCommand('price', ['MBB'], channel);
  }, 1800000); // 1800000 milliseconds = 30 minutes
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Use the abstracted function to execute commands
  executeCommand(command, args, message.channel);
});

client.login(TOKEN);