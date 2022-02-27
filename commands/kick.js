module.exports = {
    name: 'kick',
    description: 'Kicks a member',
    async execute(message, args, Cat) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("You know you can't kick other members, and so do I.");
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the ``kick members`` permission!');

        
        let target = message.mentions.members.first();
        let reason = "";
        
        if (!target) return message.reply('You know you need to mention someone to kick him, and so do I.');
        if (target.id === '867388906038231052') return message.reply('You know you have tried to kick me, and so do I.');
        if (target.id === message.author.id) return message.reply('You know you can not kick yourself, and so do I.');

        for (let i = 1; i < args.length; i++) {
            reason += args[i] + ' ';
        }
        if (!reason) reason = "No reason provided";
        if (target.kickable) {
            if (message.guild.me.hasPermission('ADD_REACTIONS')) { // a bonus confirm level if the bot has perms to react
                message.reply(`Confirm kicking ${target.user.tag}. You have 30 seconds!`).then(async (msg) => {
                const emoji = await Cat.Confirmation(msg, message.author, ["✅", "❌"], 30000);
        
        
                if (emoji === '✅') {
                    await target.kick();
                    message.channel.send(`${target.user.username} has been kicked by ${message.author} due to ${reason}`);
                }else {
                    message.reply('Process is cancelled.');
                }
            })
        }
            else { // just kick without confirming
                await target.kick();
                message.channel.send(`${target.user.username} has been kicked by ${message.author} due to ${reason}`);
            }

        }else {
            message.reply('I am unable to kick this user!');
        }
        
    }
}