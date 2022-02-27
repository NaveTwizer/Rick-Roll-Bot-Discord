module.exports = {
    name: 'addmoney',
    description: 'Adds amount of money to a user',
    execute(message, amount, db) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Only admins can use this command.');
        let target = message.mentions.members.first();
        if (!target) return message.reply('Mention someone to give him money!');
        if (!amount) return message.reply('Add the amount you wish to add!');
        let addition = parseInt(amount);
        if (isNaN(addition) || addition < 0) return message.reply('Please provide a valid amount of money to give!');

        db.add(`${target.id}.score`, addition);
        message.reply(`${amount} coins were added to ${target.user.tag}'s bank successfully!`);
    } 
}