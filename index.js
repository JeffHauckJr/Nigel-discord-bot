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
const SEARCH_TOKEN = process.env.SEARCH_TOKEN;

//Log To Console when live
client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

//Command to activate Nigel
const prefix = "!";

//test room id
const channelId = "880527083909025793";

//Greeter Message to new members of the channel.
client.on("guildMemberAdd", (member) => {
  console.log(member);
  const message = `Welcome Master ${member.user}`;
  const channel = member.guild.channels.cache.get(channelId);
  channel.send(message);
});

//Message Create Responses
client.on("messageCreate", async (msg) => {
  //Log to the console recognizing no Command
  if (msg.content[0] !== prefix) {
    console.log("no prefix");
    return;
  }

  //
  const args = msg.content.slice(prefix.length).trim().split(" ");
  //
  const command = args.shift().toLowerCase();

  //Weather Man using Node.js
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
        .setColor("#ff9538")
        .setTitle(`${data.name}'s Forecast`)
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
  //News Bot takes top 2 articles
  if (command === "news") {
    const topic = msg.content.split(" ").slice(2).join(" ");
    try {
      const CEURL = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${CETOKEN}`;
      const response = await axios.get(CEURL);
      const data = response.data;
      //This allows me to limit the data if needed
      const updatedArticles = data.articles.splice(0, 3);

      console.log(data, "!!!!!!!!!!!!!!!!!");

      const newsEmbed = new MessageEmbed()
        .setColor("#0426d1")
        .setTitle(
          `
        News On ${topic}
        To Continue Reading Click on title`
        )
        .setURL(updatedArticles[0].url)
        .addFields(
          { name: "Title", value: `${updatedArticles[0].title}` },
          { name: "Author", value: `${updatedArticles[0].author}` },
          { name: "Description", value: `${updatedArticles[0].description}` },
          { name: "Content", value: `${updatedArticles[0].content}` },
          { name: "Published Date", value: `${updatedArticles[0].publishedAt}` }
        );

      const newsEmbed2 = new MessageEmbed()
        .setColor("#0426d1")
        .setTitle(
          `
        News On ${topic}
        To Continue Reading Click on title`
        )
        .setURL(updatedArticles[1].url)
        .addFields(
          { name: "Title", value: `${updatedArticles[1].title}` },
          { name: "Author", value: `${updatedArticles[1].author}` },
          { name: "Description", value: `${updatedArticles[1].description}` },
          { name: "Content", value: `${updatedArticles[1].content}` },
          { name: "Published Date", value: `${updatedArticles[1].publishedAt}` }
        );

      msg.reply({ embeds: [newsEmbed, newsEmbed2] });
    } catch (err) {
      console.log(err, "this is the error");
      msg.reply(
        `Sorry Master ${msg.author.username} there are no articles on that topic`
      );
    }
  }
  //Ansewr Bot
  if (command === "nigel") {
    const question = msg.content.split(" ").slice(2).join(" ");
    const search = question
      .replace("an", "")
      .replace("what", "")
      .replace("is", "")
      .replace("a", "")
      .replace("how", "")
      .replace("when", "")
      .replace("where", "")
      .replace("why", "")
      .replace("who", "")
      .replace("was", "");
    console.log(question, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    try {
      const searchUrl = `https://api.duckduckgo.com/?q=${search}&format=json&pretty=1&no_html=1&skip_disambig=1`;
      const response = await axios.get(searchUrl);
      const data = response.data;
      console.log(data);

      const questionEmbed = new MessageEmbed()
        .setColor("#0426d1")
        .setTitle(
          `
      Master ${msg.author.username}, This is what I have found regarding your question
      ${question}
      `
        )
        .setURL(data.AbstractURL || data.RelatedTopics[0].FirstUrl)
        .setFields({
          name: "Answer",
          value: `${data.AbstractText || data.RelatedTopics[0].Text}`,
        });
      msg.reply({ embeds: [questionEmbed] });

      // try {
      //     const searchUrl = `https://serpapi.com/search.json?q=${question}&hl=en&gl=us&api_key=${SEARCH_TOKEN}`
      //     const response = await axios.get(searchUrl)
      //     console.log(response.data.answer_box)
    } catch (err) {
      console.log(err);
      msg.reply("I am not too sure on that one Sir");
    }
  }

  if (command === "commands") {
    const commandEmbed = new MessageEmbed()
      .setColor("#3e4a4f")
      .setTitle(
        `
      Hello Master ${msg.author.username}, Below are the current commands I can assist you with.
      `
      )
      .addFields(
        { name: "Weather", value: `! weather [City]` },
        { name: "News", value: `! news [Topic]` },
        { name: "Questions", value: `! Nigel [Question]` },
        { name: "Covid Data", value: `! Covid [Country]` },
        {
          name: "Author",
          value: `
          Discord: <@122818058703208450>
          Github: https://github.com/JeffHauckJr 
          `,
        }
      );

    msg.channel.send({ embeds: [commandEmbed] });
  }

  // Current Covid Cases
  if (command === "covid") {
    const country = msg.content.split(" ").slice(2).join(" ");
    try {
      const covidURL = `https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict&query%20`;
      const response = await axios.get(covidURL);
      const data = response.data;
      console.log(response.data, "!!!!!!!!!!!!!!!!!!!!!!!!");
      const recoveryPercent = (data.recovered / data.cases) * 100;

      const covidEmbed = new MessageEmbed()
        .setColor("#0a791a")
        .setTitle(
          `
      Hello Master ${msg.author.username}, Here are the current Covid States for ${response.data.country}.
      `
        )
        .setImage(data.countryInfo.flag)
        .addFields(
          { name: "Total Cases", value: `${data.cases}` },
          { name: "Total Deaths", value: `${data.deaths}` },
          { name: "Total Recoveries", value: `${data.recovered}` },
          {
            name: "Recovery Percent",
            value: `${Math.round(recoveryPercent)}%`,
          },
          { name: "Active Cases", value: `${data.active}` },
          { name: "Active Critical Cases", value: `${data.critical}` }
        );

      msg.channel.send({ embeds: [covidEmbed] });
    } catch (err) {
      console.log(err);
      msg.reply();
    }
  }
});

client.login(TOKEN);
