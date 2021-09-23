require("dotenv").config();
const { Client, Intents} = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
});
const commandHandler = require("./commands")
const TOKEN = process.env.TOKEN;

//Log To Console when live
client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'idle'
})
client.user.setActivity("Improving", {type: "COMPETING"})
});




client.on('voiceStateUpdate', (oldMember, newMember) => {
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {
     console.log("This is the if")
     

  } else if(newUserChannel === undefined){
    console.log("This is the else")
    console.log(client.channels.cache)
  }
})


//test room id
const channelId = "880527083909025793";

//Greeter Message to new members of the channel.
client.on("guildMemberAdd", (member) => {
  console.log(member);
  try {
    const message = `Welcome Master ${member.user}. If you use ! commands, you can see what services I am able to offer.`;
    const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  } catch (err) {
    console.log(err);
  }
});

//Message Create Responses
client.on("messageCreate", commandHandler)

client.login(TOKEN);
