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

client.login(config.token)