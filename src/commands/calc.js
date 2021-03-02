const common = require('./../common.js');
const math = require('mathjs');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Calc', 'Does Math\nUsage: `$calc <math>`'),
    "usage": 'calc <math>',
    process: function (msg, command) {
        try {
            msg.channel.send(common.embedMessage(color.main, 'Math', 'Input: `' + command[1] + '`\nResult: `' + math.evaluate(command[1]) + '`'));
        } catch (e) {
            msg.channel.send(common.embedMessage(color.red, 'Error', e));
        }
    }
}