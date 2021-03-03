const common = require('./../common.js');
const crypto = require("crypto");

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Gravatar', 'Sends you your Gravatar! :grin:\nUsage: `$gravatar <email>`'),
    "usage": 'gravatar <email>',
    process: function (msg, command) {
        let working = command.join('');
        working = working.split('gravatar').slice(1).join('').toLowerCase();

        let hash = crypto.createHash('md5');
        let data = hash.update(working, 'utf-8');
        let gen_hash= data.digest('hex');

        msg.channel.send(common.embedMessage(color.main, `Gravatar: ${working}`, '').setImage(`https://www.gravatar.com/avatar/${gen_hash}?s=200&d=mp`))
    }
}