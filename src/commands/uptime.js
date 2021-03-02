const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Uptime', 'Gives Bot Uptime\nUsage: `$uptime`'),
    "usage": 'uptime',
    process: function (msg, command) {
        msg.channel.send(common.embedMessage(color.main, 'Uptime', '**Uptime:** ' + common.msToTime(client.uptime)));
    }
}