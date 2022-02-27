module.exports = {
    name: 'verse',
    description: 'Gets the lyrics for a verse given',
    async execute(message, args) {
        if (!args[0]) return message.reply('You know you have not requested a verse, and so do I.');
        let verse = parseInt(args[0]);
        if (isNaN(verse)) return message.reply(`You know ${args[0]} is not a valid verse, and so do I.`);
        if (verse > 13 || verse <= 0) return message.reply('You know there are only 13 verses, and so do I.');

        switch (verse) {
            case 1:
                message.channel.send("We're no strangers to love \nYou know the rules and so do I \nA full commitment's what I'm thinking of \nYou wouldn't get this from any other guy");
                break;
            case 2:
                message.channel.send("I just wanna tell you how I'm feeling \nGotta make you understand");
                break;
            case 3:
                message.channel.send("Never gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you");
                break;
            case 4:
                message.channel.send("We've known each other for so long\nYour heart's been aching, but\nYou're too shy to say it\nInside, we both know what's been going on\nWe know the game and we're gonna play it");
                break;
            case 5:
                message.channel.send("And if you ask me how I'm feeling\nDon't tell me you're too blind to see");
                break;
            case 6:
                message.channel.send("Never gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you");
                break;
            case 7:
                message.channel.send("Never gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you");
                break;
            case 8:
                message.channel.send("(Ooh, give you up)\n(Ooh, give you up)\nNever gonna give, never gonna give\n(Give you up)\nNever gonna give, never gonna give\n(Give you up)");
                break;
            case 9:
                message.channel.send("We've known each other for so long\nYour heart's been aching, but\nYou're too shy to say it\nInside, we both know what's been going on\nWe know the game and we're gonna play it");
                break;
            case 10:
                message.channel.send("I just wanna tell you how I'm feeling\nGotta make you understand");
                break;
            case 11:
                message.channel.send("Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you");
                break;
            case 12:
                message.channel.send("Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you");
                break;
            case 13:
                message.channel.send("Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you");
                break;
            default:
                break;
        }
    }
}