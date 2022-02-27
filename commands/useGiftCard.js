module.exports = {
    name: 'usegiftcard',
    description: 'Use Gift Card',
    async execute(message, args) {
        const db = require('quick.db');
        let inventory = db.get(`${message.author.id}.items`);
        if (inventory == null) return message.reply('You have no items in your inventory!');
    
        
            if (!inventory.includes('Gift Card')) return message.reply('You do not have a gift card in your inventory!');

            target = message.mentions.members.first();
            if (!target) return message.reply('Mention someone to gift him!');
            

            db.add(`${target.id}.score`, 50);
            let newInventory = [];
            for (let i = 0; i < inventory.length; i++) {
                if (inventory[i] != 'Gift Card') {
                    newInventory.push(inventory[i]);
                }
            }

            db.delete(`${message.author.id}.items`);
            db.set(`${message.author.id}.items`, newInventory);
            message.channel.send(`**${message.author.tag}** gave **${target.user.tag}** 50 Rick Bits via Gift Card`);
    }
}