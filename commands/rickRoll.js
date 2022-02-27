module.exports = {
    name: 'rickroll',
    description: 'rick roll other users',
    async execute(message, db, id) {
        let target = message.mentions.members.first();
        let boostRole = message.guild.roles.cache.find(r => r.name === 'Rick Roll Master 2'); //66% success
        let random;
        let randomBonus = Math.floor(Math.random() * 4) + 1;
        if (target) {
            if (boostRole) {
                if (message.member.roles.cache.has(boostRole.id)) {
                    random = Math.floor(Math.random() * 3);
                }
                else {
                    random = Math.floor(Math.random() * 2);
                }
                if (target.id === message.author.id) return message.reply('You know you have tried to rick roll yourself, and so do I.');
                
                if (random === 0) {
                    message.reply(`This isn't your lucky day. ${target.user.username} has dodged your rick roll.`);
                }
                else {
                    db.add(`${target.user.id}.rickRolled`, 1);
                    db.add(`${message.author.id}.score`, randomBonus);
                    message.reply('You have rick rolled ' + target.user.tag + ' successfully! Run the ``r!rickrolled`` command to see how much times this user got rick rolled!');

                    db.add(`${message.author.id}.balance`, randomBonus);
                    message.channel.send(`${randomBonus} coins has been added to your bank account successfully!`);
                }
            }
            else {
                if (target.id === message.author.id) return message.reply('You know you have tried to rick roll yourself, and so do I.');    
                random = Math.floor(Math.random() * 2);
                if (random === 0) {
                    db.add(`${target.user.id}.rickRolled`, 1);
                    db.add(`${message.author.id}.score`, randomBonus);
                    message.reply('You have rick rolled ' + target.user.tag + ' successfully! Run the ``r!rickrolled`` command to see how much times this user got rick rolled!');
                }
                else {
                    message.reply(`This isn't your lucky day, ${target.user.username} has dodged your rick roll. However, you can buy a custom role to boost your chances! Run ` + "``r!purchase`` to see more!");
                }
            }
            message.reply('Yep');
        }
        else { // find by ID
            let member = message.guild.members.cache.get(id);
            if (!member) return message.reply('Member not found!');
            if (id === message.author.id) return message.reply('You know you have tried to rick roll yourself, and so do I.');
            if (boostRole) {
                if (message.member.roles.cache.has(boostRole.id)) {
                    random = Math.floor(Math.random() * 3);
                }
                else {
                    random = Math.floor(Math.random() * 2);
                }
                
                if (random === 0) {
                    message.reply(`This isn't your lucky day, ${member.user.username} has dodged your rick roll.`);
                }
                else {
                    db.add(`${member.user.id}.rickRolled`, 1);
                    db.add(`${message.author.id}.score`, randomBonus);
                    message.reply('You have rick rolled ' + member.user.username + ' successfully! Run the ``r!rickrolled`` command to see how much times this user got rick rolled!');

                }
            }
            else {
                random = Math.floor(Math.random() * 2);
                if (random === 0) {
                    db.add(`${member.user.id}.rickRolled`, 1);
                    db.add(`${message.author.id}.score`, randomBonus);
                    message.reply('You have rick rolled ' + member.user.username + ' successfully! Run the ``r!rickrolled`` command to see how much times this user got rick rolled!');
                }
                else {
                    message.reply(`This isn't your lucky day, ${member.user.username} has dodged your rick roll. However, you can buy a custom role to boost your chances! Run ` + "``r!purchase`` to see more!");
                }
            }
        }   
    }
}