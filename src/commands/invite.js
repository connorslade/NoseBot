const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Invite', 'Creates a invite for the server\nUsage: `$invite`'),
    "usage": 'invite',
    process: function (msg) {
        msg.channel.createInvite({unique: false}).then(invite => {
            msg.channel.send(common.embedMessage(color.main, 'Invite', "https://discord.gg/" + invite.code))
        });
    }
}