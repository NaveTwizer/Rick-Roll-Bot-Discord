module.exports = {
    name: 'top',
    description: 'Sends a list of the richest users in the server',
    async execute(message) {
        let users = [];
        let balances = [];
        const db = require('quick.db');
        let bal;
        let bal_digits = [];
        let richestUsers = [];
        
        message.guild.members.cache.forEach(member => {
            bal = db.get(`${member.id}.score`);
            if (bal != null) {
                balances.push(bal);
                bal_digits.push(bal.toString().length);
            }
        });
        let bals = balances.sort(function(a, b){return a - b});
        let memberCount = 0;
        message.guild.members.cache.forEach(member => {
            bal = db.get(`${member.id}.score`);
            if (bal == bals[memberCount]) {
                richestUsers[memberCount] = member.user.tag;
                memberCount++;
            }

        });
        for (let i = 0; i < bals.length; i++) {
            message.channel.send(`${bals[i]} | ${richestUsers[i]}`);
        }
        message.reply(richestUsers.length);
    }
}