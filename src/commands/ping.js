const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Ping', 'Get the ping\nUsage: `$ping`'),
    "usage": 'ping',
    process: function (msg) {
        let ping = Date.now() - msg.createdTimestamp;
        msg.channel.send(common.embedMessage(color.main, 'Ping', '**Ping:** ' + ping.toString() + 'ms\n**API:**  ' + Math.round(client.ws.ping).toString() + 'ms'))
    }
}