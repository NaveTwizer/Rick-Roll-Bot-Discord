module.exports = {
    name: 'trivia',
    description: 'Sends a random trivia question',
    async execute(message) {
        const db = require('quick.db');
        let inventory = db.get(`${message.author.id}.items`);
        if (inventory == null) return message.reply('You do not have a trivia card.');
        if (!inventory.includes('Trivia Card')) return message.reply('You do not have a trivia card! Purchase one using the ``r!purchase`` command.');
        const questions = ['What year was Rick Astely born in?', "What is Rick Astely's birthday date? Use the format ``January 1 2020``.", "What is the date Rick Astely uploaded his song to YouTube? Use the format ``January 1 2020``", "What is Rick Astely's nationality?", "What is Rick Astely's birth name?", "What day of the week was Rick Astely born in?", "Where was Rick Astely born? Country only.", "What is Rick Astely's wife name?", "Is Rick Astely married?"];
        const answers = ["1966", "february 6 1966", "october 25 2009", "british", "richard paul astley", "sunday", "england", "lene bausager", "yes"];
        const random = Math.floor(Math.random() * questions.length);
        let newInventory = [];
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i] != 'Trivia Card') {
                newInventory.push(inventory[i]);
            }
        }
        db.delete(`${message.author.id}.items`);
        db.set(`${message.author.id}.items`, newInventory);
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
        .setTitle('Trivia time!')
        .addFields(
            {name: 'Answer the question correctly to win 15 Rick Bits', value: `The question: ${questions[random]}`}
        )
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        .setThumbnail('https://events.umich.edu/media/cache/event_large_lightbox/media/attachments/2020/02/event_72368_original-1.png')
        await message.channel.send(embed);

        const filter = m => m.content.toLowerCase() === answers[random];
        const collector = message.channel.createMessageCollector(filter, {max: 1, time: 30000})
        let winnerID = "";
        let winnerThumbnail;
        collector.on('collect', (msg) => {
            winnerID = msg.author.id;
            winnerThumbnail = msg.author.displayAvatarURL();
        })
        collector.on('end', async (collected) => {
            if (winnerID === "") { // no winner
                message.channel.send(`No winners this time! The answer was **${answers[random]}**`);
            }
            else {
                db.add(`${winnerID}.score`, 15);
                const winnerEmbed = new MessageEmbed()
                .setTitle('Winner!')
                .addFields(
                    {name: 'Winner!', value: `<@${winnerID}>, congratulations!`, inline: true},
                    {name: 'Reward', value: '15 Rick Bits', inline: true},
                    {name: 'New balance', value: `${db.get(`${winnerID}.score`)}`, inline: true}
                )
                .setThumbnail(winnerThumbnail)
                .setFooter(`Trivia hosted by ${message.author.tag}`)
                .setTimestamp()
                await message.channel.send(winnerEmbed);
            }
        })
    }
}