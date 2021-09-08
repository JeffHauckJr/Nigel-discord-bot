const { MessageEmbed} = require("discord.js");
const axios = require("axios");
require("dotenv").config();
module.exports = async (msg) => {
    const question = msg.content.split(" ").slice(2).join(" ");
        const search = question
          .replace("what ", " ")
          .replace(" is ", " ")
          .replace("how ", " ")
          .replace("when ", " ")
          .replace("where ", " ")
          .replace("why ", " ")
          .replace("who ", " ")
          .replace("was ", " ")
          .replace("What ", " ")
          .replace("How ", " ")
          .replace("When ", " ")
          .replace("Where ", " ")
          .replace("Why ", " ")
          .replace("Who ", " ")
          .replace("Was ", " ")
          .replace("are ", " ")
          .replace(" a ", " ")
          .replace(" an ", " ");
        try {
          const searchUrl = `https://api.duckduckgo.com/?q=${search}&format=json&pretty=1&no_html=1&skip_disambig=1`;
          console.log(search);
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
        } catch (err) {
          console.log(err);
          msg.reply(
            "I am not too sure on that one, Perhaps you can rephrase your question?"
          );
        }
}