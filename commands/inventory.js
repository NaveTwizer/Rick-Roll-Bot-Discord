module.exports = {
    name: 'items',
    description: 'Shows users inventory',
    async execute(message, db) {
        let inventory = db.get(`${message.author.id}.items`);
        if (inventory == null || !inventory[0]) return message.reply('You do not have anything in your inventory. Purchase some using the purchase command!');
        let itemList = "";
        for (let i = 0; i < inventory.length; i++) {
            itemList += inventory[i] + ', ';
        }
        let itemListFixed = itemList.slice(0, itemList.length - 2);
        
        message.reply('Your inventory: ' + itemListFixed);
    }
}