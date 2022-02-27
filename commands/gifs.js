module.exports = {
    name: 'gif',
    description: 'Sends a random rick roll gif!',
    async execute(message) {
        const gifsArray = ["https://tenor.com/view/rickroll-spongebob-gif-20016904",
        "https://tenor.com/view/dance-moves-dancing-singer-groovy-gif-17029825",
        "https://tenor.com/view/jojo-rick-roll-gif-18248420",
        "https://tenor.com/view/rickroll-gif-20131839",
        "https://media.giphy.com/media/UX5rwy15uOTweiER2n/giphy.gif",
        "https://media.giphy.com/media/kEWaRPxjebqskhawMt/giphy.gif",
        "https://media.giphy.com/media/44hlo3M3pqK9W/giphy.gif",
        "https://media.giphy.com/media/iheEpRcvYOWKmaNV62/giphy.gif",
        "https://tenor.com/view/rickroll-jpg-gif-22074799",
        "https://tenor.com/view/loading-rick-roll-gif-21755523",
        "https://tenor.com/view/rickroll-rick-astley-pupzyy-never-gonna-give-you-up-meme-gif-20503685",
        "https://tenor.com/view/things-that-you-shouldnt-stare-at-for-too-long-the-sun-winnie-the-pooh-rickroll-rick-astley-gif-16585085"
    ];
        const random = Math.floor((Math.random() * gifsArray.length));
        
        
        await message.channel.send(gifsArray[Math.abs(random)]);

    }
}