module.exports = {
    name: 'rickrolled',
    description : 'Shows how much time a user has been rick rolled',
    execute(message, db, id) {
        let target = message.mentions.members.first();
        if (target) { // user mentioned someone
            if (target.user.bot) return message.reply('Bots are immune to rick rolls.');
            let amount = db.get(`${target.user.id}.rickRolled`);
            if (amount == null) {
                message.reply(`${target.user.tag} has not been rick rolled yet! Why not changing that with the ` + '``r!rickroll`` command?');
            }
            else {
                message.reply(`${target.user.tag} has been rick rolled **${amount}** times.`);
            }
        }
        else {
            if (!id) return message.reply('Please mention someone or provide his ID to see how much times he got rick rolled!');
            let member = message.guild.members.cache.get(id);
            if (!member) return message.reply('Member not found!');
            if (member.user.bot) return message.reply('Bots are immune to rick rolls.');

            let amount = db.get(`${member.user.id}.rickRolled`);
            if (amount == null) {
                message.reply(`${member.user.tag} has not been rick rolled yet! Why not changing that with the ` + '``r!rickroll`` command?');
            }
            else {
                message.reply(`${member.user.tag} has been rick rolled **${amount}** times.`);
            }
        }
    }
}