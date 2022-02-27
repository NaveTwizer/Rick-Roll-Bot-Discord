const Discord = require('discord.js');
const client = new Discord.Client();
// setting up other packages and stuff we need
const Cat = require('catcoderboii-discordfunctionality');
// Credit to Cat from World of Coding for creating this awesome package!
const config = require('./config.json');
const token = config.token;
const fs = require('fs');
const db = require('quick.db');
const yts = require('yt-search');


 

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const prefix = "r!";



client.on('ready', () => { // this event being fired ONCE the bot comes online
    let serverCount = 0; // bot servers count
    let totalMembersCount = 0; // shows how much users there are on all of the bot's servers
    client.guilds.cache.forEach(server => {
        serverCount++;
        totalMembersCount += server.memberCount;
    });
    console.log('I am online');
    client.user.setActivity(` ${totalMembersCount} users being rick rolled across ${serverCount} servers!`, {
        type: 'STREAMING',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })
})

client.on('message', async (message) => {
    if (!message.guild) return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' '); 
    const command = args.shift().toLowerCase(); 
    
    
    if (command === "play") {
        client.commands.get('play').execute(message, args);
    }
    else if (command === 'rickroll') {
        const { cooldowns } = client;
        if (!cooldowns.has('rickroll')) {
            cooldowns.set('rickroll', new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command);
        let cooldownAmount = 2 * 60 * 60 * 1000; // 2 hours
        let rickRollMasterRole = message.guild.roles.cache.find(role => role.name === 'Rick Roll Master');
        if (rickRollMasterRole) {
            if (message.member.roles.cache.has(rickRollMasterRole.id)) cooldownAmount /= 2;
        }
        if (message.author.id === '483779151632007169') cooldownAmount = 0; // Bot owner perks UwU (my ID)
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                let minutesLeft = Math.floor(timeLeft / 60);
                return message.reply(`You can use this command again in ${minutesLeft} minutes and ${Math.floor(timeLeft % 60)} seconds.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        client.commands.get('rickroll').execute(message, db, args[0]);
    }
    else if (command === 'bal') {
        client.commands.get('score').execute(message, db, args[0]);
    }
    else if (command === 'rickrolled') {
        client.commands.get('rickrolled').execute(message, db, args[0]);
    }
    else if (command === 'buy' || command === 'purchase') {
        client.commands.get('purchase').execute(message, args);
    } 
    else if (command === 'inventory' || command === 'items') {
        client.commands.get('items').execute(message, db);
    }
    else if (command === 'addmoney') {
        client.commands.get('addmoney').execute(message, args[1], db);
    }
    else if (command === 'darkmode' || command === 'dark') {
        client.commands.get('darkmode').execute(message); 
    }
    else if (command === 'gif') {
        client.commands.get('gif').execute(message);
    }
    else if (command === 'use') {
        if (!args[0]) return message.reply('Provide the item you want to use!');
        let target = message.mentions.members.first();
        let requestedItem = "";
        if (target) {
            for (let i = 0; i < args.length - 1; i++) {
                requestedItem += args[i].toLowerCase();
            }
        }
        else {
            for (let i = 0; i < args.length; i++) {
                requestedItem += args[i].toLowerCase();
            }
        }
        try {
            client.commands.get(`use${requestedItem}`).execute(message);
        } catch(error) {
            message.reply(`No item was found. If it's a bug, please contact my owner and report the bug. Nave Twizer#1380 <@483779151632007169>`);
        }
    }
    else if (command === 'help') {
        client.commands.get('help').execute(message);
    }
    else if (command === 'shop') {
        client.commands.get('shop').execute(message);
    }
    else if (command === 'verse') {
        client.commands.get('verse').execute(message, args);
    }
    else if (command === 'donate' || command === 'give') {
        client.commands.get('donate').execute(message, args[0]);
    }
    else if (command === "kick") {
        client.commands.get('kick').execute(message, args, Cat);
    }
    else if (command === 'views') {
        let rickRollVideoArray = await yts.search('Rick Astley - Never Gonna Give You Up (Official Music Video)');
        let vid = rickRollVideoArray.videos[0];
        message.reply(`The official video currently has **${vid.views}** views.`);
    }
    else if (command === 'trivia') {
        client.commands.get('trivia').execute(message);
    }
    //else if (command === 'top') {
    //    client.commands.get('top').execute(message);
    //}
    else if (command === 'ping') {
        client.commands.get('ping').execute(message);
    }
    else if (command === 'eval') {
        client.commands.get('eval').execute(message, args);
    }
    else if (command === 'test') {
        client.commands.get('guess').execute(message);

    }
    else return;
})



client.on('guildCreate', async (server) => {
    if (server.me.hasPermission('CHANGE_NICKNAME')) {
        server.me.setNickname("Rick Roll Bot [r!]")
    }
})
client.login(token);
