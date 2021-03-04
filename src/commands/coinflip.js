const common = require('./../common.js');

module.exports = {
    "help": 'Flips a Coin...',
    "usage": 'coinflip',
    process: function (msg) {
        if (Math.random() <= 0.5) {
            msg.channel.send(common.embedMessage(color.main, 'Coinflip', ':coin: Heads'));
            return;
        }
        msg.channel.send(common.embedMessage(color.main, 'Coinflip', ':coin: Tails'));
    }
}