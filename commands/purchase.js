module.exports = {
    name: 'purchase',
    description: 'Purchasing at item from the shop',
    async execute(message, args) {
        //if (!message.guild.me.hasPermission('ADD_REACTIONS')) return message.reply('I need permissions to react to messages to use this command.');
        const db = require('quick.db');
        let highestRolePositionPossible = message.guild.me.roles.highest.position - 1;

        let inventory = db.get(`${message.author.id}.items`);
        const MasterRickRollRolePrice_Increase_Chances = 100;
        const MasterRickRollRolePrice2_Reduce_Cooldown = 100;
        let balance;
        balance = parseInt(db.get(`${message.author.id}.score`)); // the user's balance
        if (isNaN(balance)) balance = 0;
        // if the balance is undefined so far, let it be zero

        const { MessageEmbed } = require('discord.js');
        if (!args[0]) { // purchase by reaction
        if (!message.guild.me.hasPermission('ADD_REACTIONS')) return message.reply('I do not have permissions to add reactions, use the command r!purchase ``item name``');
        const embed = new MessageEmbed()
        .setTitle(`${message.author.tag}'s shop | Your Balance: ${balance}`)
        .addFields(
            {name: 'Welcome to your shop!', value: 'Please react to this message to purchase an item!'},
            {name: 'Master Rick Roll role | 1️⃣', value: 'Lets you use the r!rickroll command every 1 hour instead of 2! Price: ' + MasterRickRollRolePrice2_Reduce_Cooldown},
            {name: 'Master Rick Roll role 2 | 2️⃣', value: 'Instead of 50% success of rick rolling others, 66%! Price: ' + MasterRickRollRolePrice_Increase_Chances},
            {name: 'The Ultimate role - an honorable role! | 3️⃣', value: 'This role does NOT grant you any special permissions on the server. Price: 1000'},
            {name: 'Green role', value: 'Purchase a green role. Price: 50 | 4️⃣'},
            {name: 'Pink role', value: 'Purchase a pink role. Price: 50 | 5️⃣'},
            {name: 'Blue role', value: 'Purchase a blue role. Price: 50 | 6️⃣'},
            {name: 'Gift Card | 50 Rick Bits | 7️⃣', value: 'A gift card you can use to donate someone else 50 Rick Bits! Price: 55 Rick Bits'},
            {name: 'Microphone | 8️⃣ ', value: 'Allows you to use the r!use microphone command. Price: 10 Rick Bits'},
            {name: 'Trivia card | 9️⃣', value: 'Allows you to use the trivia command. Price: 10 Rick Bits'},
            {name: 'Important note', value: 'Each time a role is being created / purchased, ' + "it's position will go up in the list, however it will NOT grant any special permissions."},
        ) 
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        await message.channel.send(embed).then(msg => {
            msg.react('1️⃣');
            msg.react('2️⃣');
            msg.react('3️⃣');
            msg.react('4️⃣');
            msg.react('5️⃣');
            msg.react('6️⃣');
            msg.react('7️⃣');
            msg.react('8️⃣');
            msg.react('9️⃣');

            const filter = (reaction, user) => {
                return (reaction.emoji.name === '1️⃣' && user.id === message.author.id) ||
                (reaction.emoji.name === '2️⃣' && user.id === message.author.id) || 
                (reaction.emoji.name === '3️⃣' && user.id === message.author.id) || 
                (reaction.emoji.name === '4️⃣' && user.id === message.author.id) || 
                (reaction.emoji.name === '5️⃣' && user.id === message.author.id) || 
                (reaction.emoji.name === '6️⃣' && user.id === message.author.id) || 
                (reaction.emoji.name === '7️⃣' && user.id === message.author.id) || 
                (reaction.emoji.name === '8️⃣' && user.id === message.author.id) || 
                (reaction.emoji.name === '9️⃣' && user.id === message.author.id);
            };
            const collector = msg.createReactionCollector(filter, {max: 1, time: 30000});
            let emoji;
            collector.on('collect', (reaction, user) => {
                emoji = reaction.emoji.name;
            })
            collector.on('end', async (collected) => {

                if (emoji === '1️⃣') { // user wants to get the role that allows you to use the r!rickroll command each hour instead of 2
                    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, I do not have the ``manage roles`` permission. Sad Rick noises :(');
                    if (balance < 100) return message.reply(`You need to get **${100 - balance}** more coins to purchase this item.`);
                    let role = message.guild.roles.cache.find(r => r.name === 'Rick Roll Master');

                    if (role) { // just add the role to the user
                        if (message.member.roles.cache.has(role.id)) return message.reply('You already have that role!');
                        role.setPosition(highestRolePositionPossible);
                        db.set(`${message.member.id}.score`, balance - 100);
                        message.member.roles.add(role.id);
                        const embed = new MessageEmbed()
                        .setTitle('Purchase complete!')
                        .addFields(
                            {name: 'Item purchased', value: `${role.name} role`, inline: true},
                            {name: 'New balance', value: `${db.get(`${message.member.id}.score`)}`, inline: true}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        .setFooter(`Purchase done successfully`)
                        .setTimestamp()
                        message.channel.send(embed);
                    }else { // need to create a role...
                        if (balance < 100) return message.reply(`You need **${100 - balance}** more Rick Bits to purchase this item.`);
                        let newRole = await message.guild.roles.create({
                            data: {
                                name: 'Rick Roll Master',
                                permissions: [],
                                position: highestRolePositionPossible,
                            },
                            reason: 'Need a new role for the user'
                        })
                        message.member.roles.add(newRole.id);
                        db.set(`${message.author.id}.score`, balance - 100);
                        const embed = new MessageEmbed()
                        .setTitle('Purchase done successfully!')
                        .addFields(
                            {name: 'Item purchased', value: 'Rick Roll Master role - user the rick roll command every 1 hour instead of 2', inline: true},
                            {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        .setFooter(`Purchase done successfully`)
                        .setTimestamp()
                        message.channel.send(embed);
                    }
                }
                else if (emoji === '2️⃣') {
                    if (balance < 100) return message.reply(`You need ${100 - balance} more coins to purchase this item.`);
                    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, but I do not have the ``manage roles`` permission. Sad Rick noises');

                    
                    let role = message.guild.roles.cache.find(r => r.name === 'Rick Roll Master 2');
                    if (role) {
                        if (message.member.roles.cache.has(role.id)) return message.reply('You already have that role!');
                        role.setPosition(highestRolePositionPossible);
                        message.member.roles.add(role.id);
                        db.set(`${message.author.id}.score`, balance - 100);

                        const embed = new MessageEmbed()
                        .setTitle('Purchase Complete!')
                        .addFields(
                            {name: 'Item purchased', value: `${role.name} - higher chances of rick rolling someone successfully`, inline: true},
                            {name: `New balance`, value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        .setFooter(`Purchase done successfully!`)
                        .setTimestamp()
                        await message.channel.send(embed);
                    }
                     else { // need to create the role...
                        if (balance < 100) return message.reply(`You need **${100 - balance}** more coins to purchase this item!`);
                         let newRole = await message.guild.roles.create({
                            data: {
                                name: 'Rick Roll Master 2',
                                permissions: [],
                                position: highestRolePositionPossible,
                            },
                            reason: 'Need a new role for the user'
                         });
                         message.member.roles.add(newRole.id);
                         db.set(`${message.member.id}.score`, balance - 100);
                         const embed = new MessageEmbed()
                         .setTitle('Purchase Complete!')
                         .addFields(
                            {name: 'Item purchased', value: `${newRole.name} - higher chances of rick rolling someone successfully`, inline: true},
                            {name: `New balance`, value: `${db.get(`${message.author.tag}.score`)}`, inline: true}
                         )
                         .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                         .setFooter(`Purchase done successfully!`)
                         .setTimestamp()
                         await message.channel.send(embed);
                        }
                }
                    else if (emoji === '3️⃣') { // user wants the ultimate role
                        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, but I do not have the ``manage roles`` permission.');
                        if (balance < 1000) return message.reply(`You need ${1000 - balance} more coins to purchase this item.`);
                        let ultimateRole = message.guild.roles.cache.find(r => r.name === 'Ultimate Rick Roller');
                        if (ultimateRole) {
                            if (message.member.roles.cache.has(ultimateRole.id)) return message.reply('You already have the ultimate role!');
                            ultimateRole.setPosition(highestRolePositionPossible);
                            db.set(`${message.author.id}.score`, balance - 1000);
                            message.member.roles.add(ultimateRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Ultimate Rick Roller role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                            )
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                            .setFooter(`Purchase done successfully`)
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                        else { // need to create the role
                            if (balance < 1000) return message.reply(`You need ${1000 - balance} more coins to purchase this item.`);
                            let newRole = await message.guild.roles.create({
                                data: {
                                    name: 'Ultimate Rick Roller',
                                    color: '#03121e6',
                                    permissions: [],
                                    position: highestRolePositionPossible
                                },
                                reason: 'New ultime role needed'
                            });
                            db.set(`${message.author.id}.score`, balance - 1000);
                            message.member.roles.add(newRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Ultimate Rick Roller role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                            )
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                            .setFooter(`Purchase done successfully`)
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                    }
                    else if (emoji === '4️⃣') { // user wants the green role
                        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, I do not have the ``manage roles`` permission.');
                        if (balance < 50) return message.reply(`You need ${50 - balance} more coins to purchase this item.`);
                        if (balance == null) return message.reply(1);
                        let greenRole = message.guild.roles.cache.find(r => r.name === 'Green');
                        if (greenRole) {
                            if (message.member.roles.cache.has(greenRole.id)) return message.reply('You already have the green role!');
                            if (greenRole.hexColor != '#00FF00') { // just to make sure it will be green
                                greenRole.setColor('#00FF00'); 
                            }
                            greenRole.setPosition(highestRolePositionPossible);
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(greenRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Green role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                            )
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                        else { // need to create the role
                            if (balance < 50) return message.reply(`You need ${50 - balance} more coins to purchase this item.`);
                            let newRole = await message.guild.roles.create({
                                data: {
                                    name: 'Green',
                                    color: 'GREEN',
                                    permissions: [],
                                    hoist: false,
                                    position: highestRolePositionPossible
                                },
                                reason: 'New green role'
                            });
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(newRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Green role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                            )
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                    }
                    else if (emoji === '5️⃣') { // user wants the pink role
                        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, I do not have the ``manage roles`` permission.');
                        if (balance < 50) return message.reply(`You need ${50 - balance} more coins to purchase this item.`);
                        let pinkRole = message.guild.roles.cache.find(r => r.name === 'Pink');

                        if (pinkRole) {
                            if (message.member.roles.cache.has(pinkRole.id)) return message.reply('You already have the pink role!');
                            if (pinkRole.hexColor != '#ff69b4 ') { // just to make sure it will be pink
                                pinkRole.setColor('#ff69b4 '); 
                            }
                            pinkRole.setPosition(highestRolePositionPossible);
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(pinkRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Pink role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                            )
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                        else {
                            let newRole = await message.guild.roles.create({
                                data: {
                                    name: 'Pink',
                                    permissions: [],
                                    hoist: false,
                                    position: highestRolePositionPossible
                                },
                                reason: 'New pink role'
                            });
                            newRole.setColor('#ff69b4'); // pink
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(newRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Pink role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                            )
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                    }
                    else if (emoji === '6️⃣') { // user wants the blue role
                        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, I do not have the ``manage roles`` permission');
                        if (balance < 50) return message.reply(`You need ${50 - balance} more coins to purchase this item.`);

                        let blueRole = message.guild.roles.cache.find(r => r.name === 'Blue');
                        if (blueRole) {
                            if (message.member.roles.cache.has(blueRole.id)) return message.reply('You already have the blue role!');
                            if (blueRole.hexColor != '#0000ff') { // just to make sure it will be blue
                                blueRole.setColor('#0000ff'); 
                            }
                            blueRole.setPosition(highestRolePositionPossible);
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(blueRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Blue role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                            )
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                        else { // need to create a blue role
                            let newRole = await message.guild.roles.create({
                                data: {
                                    name: 'Blue',
                                    permissions: [],
                                    hoist: false,
                                    position: highestRolePositionPossible,
                                },
                                reason: 'New blue role'
                            });
                            newRole.setColor('#0000ff'); // blue
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(newRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Blue role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                            )
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                    }
                    else if (emoji === '7️⃣') { // 50$ gift card
                        if (balance < 55) return message.reply(`You need ${55 - balance} more Rick Bits to purchase this item.`);
                        if (inventory == null) {
                            db.push(`${message.author.id}.items`, 'Gift Card');
                            db.set(`${message.author.id}.score`, balance - 55);
                            message.reply('You have purchased a 50 Rick Bits gift card as your first item successfully!');
                            return;
                        }
                        if (inventory.includes('Gift Card')) return message.reply('You already have a gift card!');

                        db.set(`${message.author.id}.score`, balance - 55);
                        db.push(`${message.author.id}.items`, 'Gift Card');
                        inventory = db.get(`${message.author.id}.items`);
                        let itemList = "";
                        for (let i = 0; i < inventory.length; i++) {
                            itemList += inventory[i] + ', ';
                        }
                        const embed = new MessageEmbed()
                        .setTitle('Purchase Complete')
                        .addFields(
                            {name: 'Item purchased', value: '50 Rick Bits Gift Card', inline: true},
                            {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`},
                            {name: 'New inventory', value: `${itemList}`}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        .setFooter(`Purchase done successfully`)
                        .setTimestamp()
                        await message.channel.send(embed);
                    }
                    else if (emoji === '8️⃣') {
                        if (balance < 10) return message.reply(`You need ${10 - balance} more Rick Bits to purchase this item.`);
                        if (inventory == null) {
                            db.push(`${message.author.id}.items`, 'Microphone');
                            db.set(`${message.author.id}.score`, balance - 10);
                            message.reply('You have purchased a microphone as your first item successfully!');
                            return;
                        }
                        if (inventory.includes('Microphone')) return message.reply('You already have a microphone!');
                        db.set(`${message.author.id}.score`, balance - 10);
                        db.push(`${message.author.id}.items`, 'Microphone');
                        const embed = new MessageEmbed()
                        .setTitle('Purchase Complete!')
                        .addFields(
                            {name: 'Item purchased', value: 'Microphone'},
                            {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        await message.channel.send(embed);
                    }
                    else if (emoji === '9️⃣') {
                        if (balance < 10) return message.reply(`You need ${10 - balance} more Rick Bits to purchase this item.`);
                        if (inventory == null) {
                            db.push(`${message.author.id}.items`, 'Trivia Card');
                            db.set(`${message.author.id}.items`, balance - 10);
                            message.reply('You have purchased a trivia card as your first item successfully!');
                            return;
                        }
                        if (inventory.includes('Trivia Card')) return message.reply('You already have a trivia card.');
                        db.set(`${message.author.id}.score`, balance - 10);
                        db.push(`${message.author.id}.items`, 'Trivia Card');
                        const embed = new MessageEmbed()
                        .setTitle('Purchase complete!')
                        .addFields(
                            {name: 'Item purchased', value: 'Trivia Card', inline: true},
                            {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                        )
                        .setFooter('Purchase done successfully')
                        .setTimestamp()
                        await message.channel.send(embed);
                    }
                    else {
                        message.reply("You did not react to the message... you let me down :(");
                    }
                });
            });
        }  
        else { // purchase item by r!purchase <item name>
            let requestedItem = "";
            for (let i = 0; i < args.length; i++) {
                requestedItem += args[i].toLowerCase();
            }
            if (requestedItem === 'rickrollmaster1' || requestedItem === 'rickrollmaster') {
                if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, I do not have the ``manage roles`` permission. Sad Rick noises :(');
                    if (balance < 100) return message.reply(`You need to get **${100 - balance}** more Rick Bits to purchase this item!`);
                    let role = message.guild.roles.cache.find(r => r.name === 'Rick Roll Master');

                    if (role) { // just add the role to the user
                        if (message.member.roles.cache.has(role.id)) return message.reply('You already have that role!');
                        role.setPosition(highestRolePositionPossible);
                        db.set(`${message.member.id}.score`, balance - 100);
                        message.member.roles.add(role.id);
                        const embed = new MessageEmbed()
                        .setTitle('Purchase complete!')
                        .addFields(
                            {name: 'Item purchased', value: `${role.name} role`, inline: true},
                            {name: 'New balance', value: `${db.get(`${message.member.id}.score`)}`, inline: true}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        .setFooter(`Purchase done successfully`)
                        .setTimestamp()
                        message.channel.send(embed);
                    }else { // need to create a role...
                        if (balance < MasterRickRollRolePrice2_Reduce_Cooldown) return message.reply(`You need **${MasterRickRollRolePrice2_Reduce_Cooldown - balance}** more coins to purchase this item!`);
                        let newRole = await message.guild.roles.create({
                            data: {
                                name: 'Rick Roll Master',
                                permissions: [],
                                position: highestRolePositionPossible,
                            },
                            reason: 'Need a new role for the user'
                        })
                        message.member.roles.add(newRole.id);
                        db.set(`${message.author.id}.score`, balance - MasterRickRollRolePrice2_Reduce_Cooldown);
                        const embed = new MessageEmbed()
                        .setTitle('Purchase done successfully!')
                        .addFields(
                            {name: 'Item purchased', value: 'Rick Roll Master role - user the rick roll command every 1 hour instead of 2', inline: true},
                            {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        .setFooter(`Purchase done successfully`)
                        .setTimestamp()
                        message.channel.send(embed);
                    }
            }
            else if (requestedItem === 'rickrollmaster2') {
                if (balance < 100) return message.reply(`You need ${100 - balance} more coins to purchase this item.`);
                    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, but I do not have the ``manage roles`` permission. Sad Rick noises');

                    
                    let role = message.guild.roles.cache.find(r => r.name === 'Rick Roll Master 2');
                    if (role) {
                        if (message.member.roles.cache.has(role.id)) return message.reply('You already have that role!');
                        role.setPosition(highestRolePositionPossible);
                        message.member.roles.add(role.id);
                        db.set(`${message.author.id}.score`, balance - 100);

                        const embed = new MessageEmbed()
                        .setTitle('Purchase Complete!')
                        .addFields(
                            {name: 'Item purchased', value: `${role.name} - higher chances of rick rolling someone successfully`, inline: true},
                            {name: `New balance`, value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                        )
                        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                        .setFooter(`Purchase done successfully!`)
                        .setTimestamp()
                        await message.channel.send(embed);
                    }
                     else { // need to create the role...
                        if (balance < 100) return message.reply(`You need **${100 - balance}** more coins to purchase this item!`);
                         let newRole = await message.guild.roles.create({
                            data: {
                                name: 'Rick Roll Master 2',
                                permissions: [],
                                position: highestRolePositionPossible,
                            },
                            reason: 'Need a new role for the user'
                         });
                         message.member.roles.add(newRole.id);
                         db.set(`${message.member.id}.score`, balance - 100);
                         const embed = new MessageEmbed()
                         .setTitle('Purchase Complete!')
                         .addFields(
                            {name: 'Item purchased', value: `${newRole.name} - higher chances of rick rolling someone successfully`, inline: true},
                            {name: `New balance`, value: `${db.get(`${message.author.tag}.score`)}`, inline: true}
                         )
                         .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                         .setFooter(`Purchase done successfully!`)
                         .setTimestamp()
                         await message.channel.send(embed);
                     }
            }
            else if (requestedItem === 'greenrole' || requestedItem === "green") {
                if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('Sorry, I do not have the ``manage roles`` permission.');
                        if (balance < 50) return message.reply(`You need ${50 - balance} more coins to purchase this item.`);
                        if (balance == null) return message.reply(1);
                        let greenRole = message.guild.roles.cache.find(r => r.name === 'Green');
                        if (greenRole) {
                            if (message.member.roles.cache.has(greenRole.id)) return message.reply('You already have the green role!');
                            if (greenRole.hexColor != '#00FF00') { // just to make sure it will be green
                                greenRole.setColor('#00FF00'); 
                            }
                            greenRole.setPosition(highestRolePositionPossible);
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(greenRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Green role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`, inline: true}
                            )
                            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);
                        }
                        else { // need to create the role
                            if (balance < 50) return message.reply(`You need ${50 - balance} more coins to purchase this item.`);
                            let newRole = await message.guild.roles.create({
                                data: {
                                    name: 'Green',
                                    color: 'GREEN',
                                    permissions: [],
                                    hoist: false,
                                    position: highestRolePositionPossible
                                },
                                reason: 'New green role'
                            });
                            db.set(`${message.author.id}.score`, balance - 50);
                            message.member.roles.add(newRole.id);
                            const embed = new MessageEmbed()
                            .setTitle('Purchase Complete')
                            .addFields(
                                {name: 'Item purchased', value: 'Green role', inline: true},
                                {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                            )
                            .setFooter('Purchase done successfully')
                            .setTimestamp()
                            await message.channel.send(embed);

                        }
            }
            else if (requestedItem === 'microphone') {
                if (balance < 10) return message.reply(`You need ${10 - balance} more Rick Bits to purchase this item.`);
                if (inventory == null) {
                    if (balance === null) return message.reply('You do not have any Rick Bits in your bank.');
                    if (balance < 10) return message.reply(`You need ${10 - balance} more Rick Bits to purchase this item.`);
                    db.push(`${message.author.id}.items`, 'Microphone');
                    db.set(`${message.author.id}.score`, balance - 10);
                    message.reply('You have purchased microphone as your first item successfully!');
                    return;
                }
                if (inventory.includes('Microphone')) return message.reply('You already have a microphone.');
                db.set(`${message.author.id}.score`, balance - 10);
                db.push(`${message.author.id}.items`, 'Microphone');
                const embed = new MessageEmbed()
                .setTitle('Purchase complete')
                .addFields(
                    {name: 'Item purchased', value: 'Microphone'},
                    {name: 'New balance', value: `${db.get(`${message.author.id}.score`)}`}
                )
                .setFooter('Purchase done successfully')
                .setTimestamp()
                await message.channel.send(embed);
            }

        }
    }
}