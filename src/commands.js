const { MessageEmbed } = require("discord.js");


module.exports = async (msg) => {
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
            { name: "YouTube Video", value: `! yt [video keyword]` },
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