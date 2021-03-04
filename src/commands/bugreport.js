const common = require('./../common.js');

module.exports = {
    "help": 'Reports a Bug',
    "usage": 'bugreport <text>',
    process: function (msg, command) {
        if (command.length > 1) {
            let working = command.join(' ').toLowerCase().replace('bugreport ', '');
            let reportUri = `https://github.com/Basicprogrammer10/NoseBot/issues/new?title=BUG&body=${working}`;
            msg.channel.send(common.embedMessage(color.main, 'Bugreport :bug:', 'Click the title to submit report!').setURL(encodeURI(reportUri)));
        } else {
            msg.channel.send(common.embedMessage(color.red, 'Error', 'No text Supplied'));
        }
    }
}