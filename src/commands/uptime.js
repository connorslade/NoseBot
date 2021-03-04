const common = require('./../common.js');

module.exports = {
    "help": 'Gives Bot Uptime',
    "usage": 'uptime',
    process: function (msg) {
        msg.channel.send(common.embedMessage(color.main, 'Uptime', '**Uptime:** ' + common.msToTime(client.uptime)));
    }
}