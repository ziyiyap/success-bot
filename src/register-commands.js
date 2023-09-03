require('dotenv').config();
const { REST , Routes } = require("discord.js");

const commands = [
    {
        name: 'ping',
        description: "Checks bot's latency",
    },
    {
        name: 'hello',
        description: 'says hi!',
    }
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering Slash Commands')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log("Slash commands are registered")
    } catch (error) {
        console.log(`There was an error.\n${error}`)
    }
})();