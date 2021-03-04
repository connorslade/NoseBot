const common = require('./../common.js');

module.exports = {
    "help": 'Says Stuff',
    "usage": 'say <text>',
    process: function (msg, command) {
        let working;
        if (command.length > 1) {
            working = '';
            for (let i = 1; i < command.length; i++) {
                working = working + ' ' + command[i]
            }
            if (working.length > 1) {
                msg.channel.send(common.embedMessage(color.main, working, "").setFooter(`${msg.author.username}#${msg.author.discriminator}`));
                return;
            }
            msg.channel.send(common.embedMessage(color.red, 'Error', 'I cant run my own commands :joy:'));
            return;
        }
        msg.channel.send(common.embedMessage(color.red, 'Error', 'No text Supplied'));
    }
}