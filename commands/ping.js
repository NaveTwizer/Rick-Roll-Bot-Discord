module.exports = {
    name: 'ping',
    description: 'Sends the bots ping',
    async execute(message) {
        message.reply('Never gonna give you up, please wait..').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`🏓 Your ping: ${ping}`);
        })
    }
}