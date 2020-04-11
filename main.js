const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require("fs")

const servers = require('./messages.json');
const config = require("./config.json");

client.on("ready", () => {
    console.log(`${client.user.username} is now online!`);
})

client.on('message', async msg => {
    // To allow multiple words add -- || msg.content === "another_one"
    if (msg.content === "insert_word_here")
    {
        if (!msg.author.bot) {
            // Counts how many times the word has been said in different servers, mapped by ID's
            if (!servers[msg.guild.id]) servers[msg.guild.id] = { messageCount: 1 };
            else servers[msg.guild.id].messageCount++;
        
            try {
              fs.writeFileSync('./messages.json', JSON.stringify(servers));
            } catch(err) {
              console.error(err);
            }
        }
    }
    else
    {
        // Deletes all messages except the ones mentioned above
        msg.delete();
    }
});

client.login(config.token)