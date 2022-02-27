module.exports = {
    name: 'donate',
    description: 'Donate Rick Bits to other user',
    async execute(message, amount) {
        let target = message.mentions.members.first();
        if (!target) return message.reply('Mention the user you wish to donate to.');
        if (!amount) return message.reply('Add the amount of Rick Bits you wish to donate!');
        
        const randomTaxes = [0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
        const random = Math.floor(Math.random() * randomTaxes.length);
        const taxRate = randomTaxes[random];
        const donation = parseFloat(amount);
        if (isNaN(donation)) return message.reply('Command format: ``r!give x @user``');
        const db = require('quick.db');
        const currentBalUser = db.get(`${message.author.id}.score`);
        const currentBalTarget = db.get(`${target.id}.score`);
        if (donation > currentBalUser) return message.reply(`You can not donate ${donation} Rick Bits when you got only ${currentBalUser}!`);
        db.set(`${message.author.id}.score`, currentBalUser - donation);
        db.set(`${target.id}.score`, currentBalTarget + donation * taxRate);
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
        .setTitle('Donation done successfully!')
        .addFields(
            {name: `${message.author.tag}'s old balance`, value: currentBalUser, inline: true},
            {name: `${message.author.tag}'s new balance`, value: `${db.get(`${message.author.id}.score`)}`},
            {name: `${target.user.tag}'s old balance`, value: currentBalTarget, inline: true},
            {name: `${target.user.tag}'s new balance`, value: `${db.get(`${target.id}.score`)}`}
        )
        .setFooter(`Tax rate: ${100 - (taxRate * 100)}%`)
        .setTimestamp()
        await message.channel.send(embed);
    }
}