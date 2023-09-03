const {devs, testServer} = require('../../../config.json'); 
module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if (!commandObject) return;
        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only worthy people are allowed to use this command.',
                    ephemeral: true,
                });
                return;
            }

            if (commandObject.testOnly) {
                if (!(interaction.guild.id === testServer)) {
                    interaction.reply({
                        content: 'This command cannot be ran here.',
                        ephemeral: true,
                    });
                    return;
                }
            }

            if (commandObject.permissionsRequired?.length) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permission.has(permission)) {
                        interaction.reply({
                            content: "You are not worthy enough to run this command",
                            ephemeral: true,
                        });
                        break;
                    }
                }
            }
            if (commandObject.botPermissions?.length) {
                for (const permission of commandObject.botPermissions) {
                    const bot = interaction.guild.members.me;
                    
                    if (!bot.permissions.has(permission)) {
                        interaction.reply({
                            content: "You are not worthy enough to run this command",
                            ephemeral: true,
                    });
                    break;
                }
            }
        }
    } catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }
};
