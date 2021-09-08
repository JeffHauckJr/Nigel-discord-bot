const axios = require("axios");
require("dotenv").config();
const YT_TOKEN = process.env.YOUTUBE_TOKEN;

module.exports = async (msg) => {
    const ytSearch = msg.content.split(" ").slice(2).join(" ");
    
        try {
          const ytURL = `https://www.googleapis.com/youtube/v3/search?key=${YT_TOKEN}&type=video&part=snippet&q=${ytSearch}`;
          const response = await axios.get(ytURL);
          const data = response.data.items;
    
          msg.reply(`https://www.youtube.com/watch?v=${data[0].id.videoId}`);
        } catch (err) {
          console.log(err);
          msg.reply("Sorry, I could not find a video on that.")
        }
}