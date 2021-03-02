const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Github', 'Sends you to the NoseBot Github\nUsage: `$github`'),
    "usage": 'github',
    process: function (msg) {
        msg.channel.send(common.embedMessage(color.main, 'Github :octopus:', '**NoseBot**\nhttps://github.com/Basicprogrammer10/NoseBot').attachFiles(common.localImgUploads('./assets/Github.png', 'file.png')).setThumbnail("attachment://file.png"));
    }
}