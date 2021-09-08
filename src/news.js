const {MessageEmbed } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
const CETOKEN = process.env.CETOKEN;

module.exports = async (msg) => {
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