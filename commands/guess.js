module.exports = {
    name: "guess",
    description: "random guessing game from a random verse",
    async execute(message) {
        const random = 1/*Math.floor(Math.random() * 13) + 1*/;
        let /*random2 = Math.floor(Math.random() * 2) + 1*/ random2 = 1;
        if (random2 === 1) {
            switch (random) {
                case 1:// i am thinking about a random WORD from the first verse UwU
                const verse1 = ["we", "are", "no", "strangers", "to", "love", "you", "know", "the", "rules", "and", "so", "do","i", "a", "full", "commitment's", "what", "i'm", "thinking", "of", "you", "wouldn't", "get", "this", "from", "any", "other", "guy"];
                let index = Math.floor(Math.random() * verse1.length);
                const filter = m => m.content.toLowerCase() === verse1[index];
                const collector = message.channel.createMessageCollector(filter, {max:1, time: 120000});
                message.channel.send("I am thinking of a random word from the first verse... guess the word! You got 2 minutes.");
                collector.on('collect', async (UwUCat) => {
                    message.reply('UwU correct!');
                })
                collector.on('end', async (cri) => {
                    message.reply(`The answer was ${verse1[index]}`);
                })
                    break;
            
                default:
                    break;
            }
        }
        else {

        }
    }
}