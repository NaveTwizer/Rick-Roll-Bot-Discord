module.exports = {
    name: 'help',
    description: 'help command',
    async execute(message) {
        const { MessageEmbed } = require('discord.js');

        const embed = new MessageEmbed()
        .setTitle('Commands list')
        .addFields(
            {name: 'r!dark / r!darkmode', value: 'Sends a special rick roll gif designed for dark mode users'},
            {name: 'r!gif', value: 'Sends a random rick roll gift'},
            {name: 'r!kick @user reason', value: 'Kicks a user'},
            {name: 'r!play', value: 'Plays a YT song on a vc'},
            {name: 'r!rickroll @user / r!rickroll user_ID', value: 'Have a chance of rick rolling another user'},
            {name: 'r!rickrolled @user / r!rickrolled user_ID', value: 'Shows how much time a user was rick rolled'},
            {name: 'r!bal / r!bal user_ID', value: 'Shows your (or someones else) balance'},
            {name: 'r!verse x', value: 'Sends the lyrics of verse x (from 1 to 13)'},
            {name: 'r!inventory', value: 'Shows your inventory'}
        )
        .setThumbnail(message.guild.iconURL())
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()

        await message.channel.send(embed);
    }
}