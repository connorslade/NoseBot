const common = require('./../common.js');

module.exports = {
    "help": 'Hidden Command for Kool Peeps only (AKA not you)',
    process: function (msg, command) {
        if (msg.author.id === config['adminId'] || msg.author.id === "466967710685855744") {
            let working = command.join(' ');
            working = working.split('eval ')[1];
            try {
                msg.channel.send(common.embedMessage(color.main, "Eval", 'Code: `' + working + '`\n' + eval(working)));
            } catch (e) {
                msg.channel.send(common.embedMessage(color.red, 'Code: `' + working + '`\nError', e));
            }
            return;
        }
        msg.channel.send(common.embedMessage(color.red, 'Who do you think you are!?', 'No backdooring for you!'));
    }
}