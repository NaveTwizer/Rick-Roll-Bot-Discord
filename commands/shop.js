module.exports = {
    name: 'shop',
    description: 'Shows what the user can buy with his score',
    async execute(message) {
        const { MessageEmbed } = require('discord.js');

        const embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Shop`)
        .addFields(
            {name: 'r!buy Rick Roll Master', value: 'Purchases a Rick Roll Master role, which allows you to use the rick roll command every 1 hour instead of 2! Price: 100'},
            {name: 'r!buy Rick Roll Master 2', value: 'Purchses a role that gives you higher chances of rick rolling other users successfully, price: 100'},
            {name: 'r!buy Ultimate', value: 'Purchases the ultimate role! This role does not give anything special but glory over others! Price: 1000'},
            {name: 'r!buy Gift Card', value: 'Purchases a microphone which allows you to use the r!giftcard command'}
        )
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()

        await message.channel.send(embed);
    }
}