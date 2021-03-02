const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Bugreport', 'Reports a Bug\nUsage: `$bugreport <text>`'),
    "usage": 'bugreport <text>',
    process: function (msg, command) {
        if (command.length > 1) {
            let working = command.join(' ').toLowerCase().replace('bugreport ', '');
            msg.channel.send(common.embedMessage(color.main, 'Bugreport :bug:', 'Bug has been Reported!\n`' + working + '`'));
        } else {
            msg.channel.send(common.embedMessage(color.red, 'Error', 'No text Supplied'));
        }
    }
}