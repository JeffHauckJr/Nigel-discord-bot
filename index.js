//4 Bot can be connected with other api based on question
//search for other keywords that may apply

require("dotenv").config();
const axios = require("axios");
const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const TOKEN = process.env.TOKEN;
const WEATHER_KEY = process.env.WEATHER_KEY;
const CETOKEN = process.env.CETOKEN;

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

const prefix = "!";

const channelId = "880527083909025793";
client.on("guildMemberAdd", (member) => {
  console.log(member);
  const message = `Welcome Master ${member.user}`;
  const channel = member.guild.channels.cache.get(channelId);
  channel.send(message);
});

client.on("messageCreate", async (msg) => {
  if (msg.content[0] !== prefix) {
    console.log("no prefix");
    return;
  }
  const args = msg.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (command === "weather") {
    try {
      const city = msg.content.split(" ").slice(2).join(" ");
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}
      `;
      const { data } = await axios.get(URL);
      const description = data.weather[0].description;
      const currentTempK = data.main.temp;
      const currentTempF = Math.floor((currentTempK - 273.15) * 1.8 + 32);
      const feelsLike = Math.floor((data.main.feels_like - 273.15) * 1.8 + 32);
      const tempHigh = Math.floor((data.main.temp_max - 273.15) * 1.8 + 32);
      const tempLow = Math.floor((data.main.temp_min - 273.15) * 1.8 + 32);
      const humidity = data.main.humidity;
      console.log(data);

      const embed = new MessageEmbed()
        .setColor("#7d32a8")
        .setTitle(`${data.name} Forecast`)
        .setURL()
        .addFields(
          { name: "Current Conditions", value: `${description}` },
          { name: "Current Temperature", value: `${currentTempF}°F` },
          { name: "Feels Like", value: `${feelsLike}°F` },
          { name: "Today's High", value: `${tempHigh}°F` },
          { name: "Today's Low", value: `${tempLow}°F` },
          { name: "Humidity", value: `${humidity}%` }
        );

      msg.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      msg.reply(`No Current Data`);
    }
  }

  if (command === "news") {
    const topic = msg.content.split(" ").slice(2).join(" ");
    console.log(topic, "THIS IS THE TOPIC");
    try {
      const CEURL = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${CETOKEN}`;
      const  response  = await axios.get(CEURL);
      console.log(response.data, "!!!!!!!!!!!!!!!!!!!!!");
      msg.reply(`This shit is working Master ${msg.author.username}`)
    } catch (err) {
      console.log(err, 'this is the error');
      msg.reply(
        `Sorry Master ${msg.author.username} there are no articles on that topic`
      );
    }
  }
});

client.login(TOKEN);
