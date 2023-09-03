const { ActivityType } = require('discord.js');
module.exports = (client) => {
    console.log(`One must imagine ${client.user.username} happy.`);
    client.user.setPresence({ status: 'dnd' });

    client.user.setActivity({
        name: "Rolling a boulder.",
        type: ActivityType.Playing,
    })
};
