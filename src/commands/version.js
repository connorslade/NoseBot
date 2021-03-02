const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Version', 'Gives Version Info\nUsage: `$version`'),
    "usage": 'version',
    process: function (msg, command) {
        msg.channel.send(common.embedMessage(color.main, "Version", 'Version: ' + version + '\n Created by **Sigma76**\nDiscord: Sigma#8214').attachFiles(common.localImgUploads('./assets/Sigma.png', 'file.png')).setThumbnail("attachment://file.png").setURL("https://github.com/Basicprogrammer10"));
    }
}