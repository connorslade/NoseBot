const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: among-us', 'Sends among us server code\nUsage: `$among-us <code>`'),
    "usage": 'among-us <code>',
    process: function (msg, command) {
        if (command.length > 1) {
            let working = command.join(' ').toLowerCase().replace('among-us ', '');
            msg.channel.send(common.embedMessage(color.amongUs, 'Among Us Code', 'Join Among Us now!\n**Code:** `' + working + '`').attachFiles(common.localImgUploads('./assets/amongUs.png', 'file.png')).setThumbnail("attachment://file.png").setFooter(common.getFormatDT()));
        } else {
            msg.channel.send(common.embedMessage(color.red, 'Error', 'No code Supplied\nUsage: `$among-us <code>`'));
        }
    }
}