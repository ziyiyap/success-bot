const { Client, IntentsBitField, ActivityType, EmbedBuilder, Embed } = require('discord.js');

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
    client.user.setPresence({ status: 'dnd' });

    client.user.setActivity({
        name: "Rolling a boulder.",
        type: ActivityType.Playing,
    })
});

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