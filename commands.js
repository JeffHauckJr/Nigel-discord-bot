require("dotenv").config();
const commandFunction = require("./src/commands")
const covidFunction = require("./src/covid");
const newsFunction = require("./src/news");
const qaFunction = require("./src/q_a")
const weatherFunction = require("./src/weather")
const ytFunction = require("./src/yt")
const testCommand = require("./src/test")
const prefix = "!";

module.exports = async (msg) => {
    //Log to the console recognizing no Command
    if (msg.content[0] !== prefix) {
        console.log("no prefix");
        return;
      }

     
    if (
        msg.content.includes(`Thanks Nigel`) ||
        msg.content.includes(`Thank you Nigel`)
      ) {
        console.log("This is firing");
        msg.reply(`You are welcome Master ${msg.author.username}`);
      }
      
    
      
      //
      const args = msg.content.slice(prefix.length).trim().split(" ");
      //
      const command = args.shift().toLowerCase();

      
      
      
      if(command === "test"){
        testCommand(msg)
      }
        
      

      //10,800,000 3 hours in ms

    
      //Weather Man using Node.js
      if (command === "weather") {
        weatherFunction(msg)
      }
      //News Bot takes top 2 articles
      if (command === "news") {
        newsFunction(msg)
      }
      //Ansewr Bot
      if (command === "nigel") {
        qaFunction(msg)
      }
    
      if (command === "commands") {
        commandFunction(msg)
      }
    
      // Current Covid Cases
      if (command === "covid") {
        covidFunction(msg)
      }
      //This is just something to mess with a user
      // if (msg.author.id === '709784483271802880') {
      //   try {
      //     const img = 'https://cdn.discordapp.com/attachments/879797937096515587/883164171053715518/Mocking-Spongebob.png'
      //     const roast = [
      //       "Shut up Bitch",
      //       "Ya mama",
      //       "Who are you again?",
      //       img,
      //       "And you are?"
      //     ]
      //     var randomResponse = roast[Math.floor(Math.random()*roast.length)];
    
      //     msg.reply(`${randomResponse}`)
      //   } catch(err) {
      //     console.err(err)
      //   }
    
      // }
    
      if (command === "yt") {
        ytFunction(msg)
      }
}