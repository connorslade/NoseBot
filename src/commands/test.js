const common = require('./../common.js');

module.exports = {
    "name": "test",
    "help": common.embedMessage(color.help, 'Help: Test', 'Just a Test Command :/'),
    "usage": 'test',
    process: function (msg, command) {
        msg.channel.send('It Works!');
    }
}