module.exports = {
    name: 'score',
    description: 'Shows your balance',
    async execute(message, db, id) {
        const { MessageEmbed } = require('discord.js');
        let target = message.mentions.members.first();
        if (!target) { // user wants his own bal or someone's else by ID

            if (!id) { // user wants his own bal
                const Score = db.get(`${message.author.id}.score`);
                if (Score == null) {
                    message.reply('You have yet to rick roll any user!');
                }
                else {
                    //message.reply(`Your balance: **${Score}** coins.`)
                    const embed = new MessageEmbed()
                    .setTitle(`${message.author.tag}'s balance`)
                    .addField('Balance', Score, true)
                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                    await message.channel.send(embed);   
                }
            }
            else {
                const member = message.guild.members.cache.get(id);
                if (!member) return message.reply('Member not found!');
                const Score = db.get(`${member.id}.score`);
                if (Score == null) {
                    message.reply(`**${member.user.tag}** have yet to rick roll other users!`);
                }
                else {
                    message.reply(`${member.user.tag}'s balance: ${Score} coins.`);
                }
            }
        }
        else {
            const bal = db.get(`${target.id}.score`);
            if (bal == null) {
                message.reply('This user has 0 coins in his bank.');
            }
        }
    }
}