const {inspect} = require('util')
module.exports = {
    name: 'eval',
    description: 'eval a code, only I can use this command.)',
    async execute(message, args) {
        if (['483779151632007169', '853660407968694302', '861900279699341362'].includes(message.author.id)) { // my ID and my alts
            let response;
            let isErr = false
            
            
                        // Do not think you are doing a big brain move moving this function to another file, let this stay here.
                        async function BetterEval(str) {
                        str.replace(/[“”]/g, '"').replace(/[‘’]/g, '\'');
                        let returnStr;
                        let isError;
                        try {
                            if (str.includes('await') && !str.includes('\n')) {
                                str = '( async () => {return ' + str + '})()';
                            } else if (str.includes('await') && str.includes('\n')) {
                                str = '( async () => {' + str + '})()';
                            }
                            returnStr = await eval(str);
                            if (typeof returnStr !== 'string') {
                                returnStr = inspect(returnStr, { depth: 3 });
                            }
                                isError = false;
                            } catch (e) {
                                isError = true;
                                returnStr = e.toString();
                            }
        
                            return {
                                res: returnStr,
                                isError: isError,
                            };
                        }
        
                    function parseFromCodeblock(str) {
                        const rgx = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;
                        if (rgx.test(str)) {
                        const parsed = rgx.exec(str);
                            if (!parsed) return str;
                                return parsed[2] || str;
                            }
                        return str;
                    }
        
            let _evalled = await BetterEval(parseFromCodeblock(args.join(' ')))
            response = _evalled.res
            isErr = _evalled.isError || false
        
        
            let messageContent = isErr === true ? "**Error**" + "`".repeat(3) + "prolog\n" : "`".repeat(3) + "js\n"
        
        
            messageContent += typeof response === 'string' ? response.toString().substr(0, 1980) : require("util").inspect(response, { depth: 3}).toString().substr(0, 1980) || ""
        
            messageContent += "`".repeat(3)
            if (messageContent.length < 1023) {
                await message.channel.send(messageContent);
            }
            else {
                return;
            }
          }
          else {
            message.reply('Only my owners can use this command.');
          }
    }
}