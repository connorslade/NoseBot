const common = require('./../common.js');
const math = require('mathjs');

module.exports = {
    "help": 'Does Math',
    "usage": 'calc <math>',
    process: function (msg, command) {
        try {
            msg.channel.send(common.embedMessage(color.main, 'Math :school:', `Input: \`${command[1]}\` \nResult: \`${ math.evaluate(command[1])}\``));
        } catch (e) {
            msg.channel.send(common.embedMessage(color.red, 'Error', e));
        }
    }
}