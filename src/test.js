const {MessageEmbed, Client, Intents} = require("discord.js");
const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
    ],
  });
const axios = require("axios");
require("dotenv").config();

module.exports = async (msg) => {

    console.log(client)
        const wellCheck = () => {
          setInterval (function () {
            msg.channel.send(`Don't Forget to take a break and drink some water!`);
          }, 1 * 1000); 
        }
  
        wellCheck()
}