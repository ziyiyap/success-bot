const { Client, IntentsBitField, ActivityType, EmbedBuilder, Embed } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

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

eventHandler(client);

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        const startTime = Date.now();
        const embed = new EmbedBuilder().setTitle("Pinging...").setColor("Random")
        const pingMessage = await interaction.reply({embeds : [embed] });
        const endTime = Date.now();

        const latency = endTime - startTime;
        const pingembed = new EmbedBuilder().setTitle('Pong! 🏓').setDescription(`Latency: ${latency}ms`).setColor("Random")

        pingMessage.edit({embeds : [pingembed] });
    }

    if (interaction.commandName === 'hello') {
        const startTime = Date.now();
        await interaction.reply('Hi');
    }
})

client.login(config.token)