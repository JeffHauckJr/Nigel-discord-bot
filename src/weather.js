const { MessageEmbed, } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
const WEATHER_KEY = process.env.WEATHER_KEY;

module.exports = async (msg) => {
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