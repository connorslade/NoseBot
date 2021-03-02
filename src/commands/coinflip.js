const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: CoinFlip', 'Flips a Coin...\nUsage: `$coinflip`'),
    "usage": 'coinflip',
    process: function (msg, command) {
        if (Math.random() <= 0.5) {
            msg.channel.send(common.embedMessage(color.main, 'Coinflip', ':coin: Heads'));
        } else {
            msg.channel.send(common.embedMessage(color.main, 'Coinflip', ':coin: Tails'));
        }
    }
}