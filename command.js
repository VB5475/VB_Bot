const { REST, Routes, Options } = require('discord.js');
require("dotenv").config()


const tempToken = process.env.TOKEN
const clientID = process.env.CLIENT_ID
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'create',
        description: 'returns short url',
        options: [{
            type: 3,
            name: "url",
            description: "url to shorten",
            required: true
        }]
    },
];

const rest = new REST({ version: '10' }).setToken(tempToken);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(clientID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})()