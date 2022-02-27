module.exports = {
    name: 'darkmode',
    description: 'Sends a rick roll gif designed for dark mode users!',
    async execute(message) {

        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.reply('I can not send links.. **sad Rick noises**');

        message.channel.send('https://media.discordapp.net/attachments/661264254627872827/830899495633944636/rick_gif-1.gif');

        

    }
}