const {MessageEmbed} = require("discord.js");
const axios = require("axios");
require("dotenv").config();
module.exports = async (msg) => {
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
          Hello Master ${msg.author.username}, Here are the current Covid Stats for ${response.data.country}.
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
          msg.reply(`That is not a country Master ${msg.author.username}`);
        }
}