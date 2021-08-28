//1 Bot needs to greet new members
//search for new members and greet them as they join

//2 Bot needs to respond when tagged
//search for bots name being tagged

//3 Bot needs to be connected with weather api 
//search for keyword "weather" 

//4 Bot can be connected with other api based on question
//search for other keywords that may apply


require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});
const TOKEN = process.env.TOKEN;
const WEATHERTOKEN = process.env.WEATHERTOKEN


client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

const prefix = '!'

const channelId = "880527083909025793"
client.on("guildMemberAdd", (member) => {
  console.log(member)
  const message = `Welcome Master ${member.user}`
  const channel = member.guild.channels.cache.get(channelId)
  channel.send(message)
})

client.on("messageCreate", (msg) => {
  if(msg.content[0] !== prefix) {
    console.log('no prefix')
    return 
  }
  const args = msg.content.slice(prefix.length).trim().split(' ')
  console.log(args)
  const command = args.shift().toLowerCase()
  console.log(command)
})

client.login(TOKEN);