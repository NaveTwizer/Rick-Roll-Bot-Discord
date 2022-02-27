module.exports = {
    name: 'usemicrophone',
    description: 'Use the microphone item',
    async execute(message) {
        const db = require('quick.db');
        const { MessageEmbed } = require('discord.js');
        let inventory = db.get(`${message.author.id}.items`);
        if (inventory == null || !inventory[0]) return message.reply('You do not have items in your inventory!');

        if (!inventory.includes('Microphone')) return message.reply('You do not have a Microphone! Purchase one using the ``r!purchase`` command.');

        const randomSentences = ['never gonna give...', 'never gonna run around..', 'never gonna let..', 'never gonna say...', 'never gonna tell a...', 'a full...', 'we have known...', 'dont tell me...', 'gotta make you...'];
        const answers = ['you up', 'and desert you', 'you down', 'goodbye', 'lie and hurt you', "commitment's what i'm thinking of", 'each other for so long', 'you are too blind to see', 'understand'];

        const randomIndex = Math.floor(Math.random() * randomSentences.length);
        let newInventory = [];
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i] != 'Microphone') {
                newInventory.push(inventory[i]);
            }
        }


            let winnerID = "";
            let winnerThumbnail;
            message.channel.send(`🎤 Singing time! Complete the sentence to win 5 Rick Bits! You have 1 minute. The sentence: ${randomSentences[randomIndex]}`);
            const filter = m => m.content.toLowerCase() === answers[randomIndex];
            const collector = message.channel.createMessageCollector(filter, {max :1, time: 60000});
            collector.on('collect', msg => {
                winnerID = msg.author.id;
                winnerThumbnail = msg.author.displayAvatarURL();
            });
            collector.on('end', async (collected) => {
                if (winnerID === "") {
                    message.channel.send(`No winners this time! The answer was ${answers[randomIndex]}`);
                    db.add(`${message.author.id}.score`, 5);
                    message.reply('As there were no winners, you have been refunded 5 Rick Bits back.');
                }
                else {
                    const embed = new MessageEmbed()
                    .setTitle('Winner!')
                    .addFields(
                        {name: 'Winner', value: `<@${winnerID}> , congratulations!`, inline: true},
                        {name: 'Reward', value: '5 Rick Bits', inline: true}
                    )
                    .setFooter(`Event hosted by ${message.author.tag}`)
                    .setThumbnail(winnerThumbnail)
                    await message.channel.send(embed);
                    db.add(`${winnerID}.score`, 5);
                }
            })
            db.delete(`${message.author.id}.items`);
            db.set(`${message.author.id}.items`, newInventory);
            
    }
}