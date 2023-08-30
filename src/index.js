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

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        const startTime = Date.now();
        const pingMessage = await interaction.reply('Pinging...');
        const endTime = Date.now();

        const latency = endTime - startTime;

        pingMessage.edit(`Pong! 🏓\nLatency: ${latency}ms`);
    }
})

client.login(config.token)