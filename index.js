
const { Client, GatewayIntentBits } = require('discord.js');
const express = require("express")
const app = express()
const { connectToMongoDB } = require("./connect")
const URL = require("./models/url")
const { ShortURLMaker } = require("./utils/shortURLMaker")
require('dotenv').config()
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const tempToken = process.env.TOKEN



const PORT = 8001

client.on('messageCreate', (message) => {
    if (message.author.bot) return
    console.log(message.content);
    message.reply({
        content: "hi from bot"
    })
});

connectToMongoDB("mongodb://0.0.0.0:27017/discordBot").then(() => console.log("mongodb connected"))
client.on("interactionCreate", async (interaction) => {
    console.log(interaction)
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "ping") return interaction.reply("pong!!")
    if (interaction.commandName === "create") {

        await interaction.deferReply();
        await interaction.editReply(`creating with short url for ${interaction.options._hoistedOptions[0].value}`)
        // console.log(interaction.options._hoistedOptions[0].value)
        const shorturl = await ShortURLMaker(interaction.options._hoistedOptions[0].value)


        return interaction.followUp(shorturl)
    }

})

app.use("/:shortID", async (req, res) => {
    const shortID = await req.params.shortID
    const entry = await URL.findOneAndUpdate({ shortID }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })

    res.redirect(entry.redirectURL)
})




app.listen(PORT, () => { console.log(`server started at ${PORT}`) })
client.login(tempToken);