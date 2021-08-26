require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const TOKEN = process.env.TOKEN;


client.on("ready", () => {
    console.info(`Logged in as ${client.user.tag}!`);
  });
  

client.on("messageCreate", (msg) => {
    if (msg.content.includes(`${client.user.tag}`)) {
        console.log(client.user.tag)
        msg.send(`How can I help you master ${client.user.tag}`)
    }
})






client.login(TOKEN)