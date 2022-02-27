module.exports = {
    name: 'play',
    description: 'Plays music on a vc',
    async execute(message, args) {
        const { MessageEmbed } = require('discord.js');
        const ytdl = require('ytdl-core');
        const yts = require('yt-search');

        
        
        if (!message.member.voice.channel) return message.reply('You need to be in a VC!');
        if (!args[0]) return message.reply("Add the song's name!");

        const connection = await message.member.voice.channel.join();

        const videosFound = await yts(args.join(' '));
        const firstVideo = videosFound.videos[0];
        if (!firstVideo) return message.reply('No video was found!');
        const dispatcher = connection.play(ytdl(`${firstVideo.url}`, {filter: 'audioonly'}));
        
        const embed = new MessageEmbed()
        .setTitle('Now playing!')
        .setURL(firstVideo.url)
        .addField(`Now playing in ${message.guild.me.voice.channel.name}`, `${firstVideo.title}`)
        .setThumbnail(firstVideo.thumbnail)
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()

        dispatcher.on('start', () => {
            message.channel.send(embed);
        })

    }

}