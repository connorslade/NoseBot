const common = require('./../common.js');

module.exports = {
    "help": 'Get the ping',
    "usage": 'ping',
    process: function (msg) {
        let ping = msg.createdTimestamp - Date.now();
        msg.channel.send(common.embedMessage(color.main, 'Ping', '**Ping:** ' + ping.toString() + 'ms\n**API:**  ' + Math.round(client.ws.ping).toString() + 'ms'))
    }
}