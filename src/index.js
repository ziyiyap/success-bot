const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
require('dotenv').config();

const config = {
    token: process.env.TOKEN,
}

client.on('ready', (c) => {
    console.log(`One must imagine ${c.user.username} happy.`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'ping') {
        const startTime = Date.now();
        const pingMessage = await message.reply('Pinging...');
        const endTime = Date.now();

        const latency = endTime - startTime;

        pingMessage.edit(`Pong! 🏓\nLatency: ${latency}ms`);
    }
});

client.login(config.token)