const common = require('./../common.js');

module.exports = {
    "help": 'Gives Version Info',
    "usage": 'version',
    process: function (msg) {
        msg.channel.send(common.embedMessage(color.main, "Version", 'Version: ' + version + '\n Created by **Sigma76**\nDiscord: Sigma#8214').attachFiles(common.localImgUploads('./assets/Sigma.png', 'file.png')).setThumbnail("attachment://file.png").setURL("https://github.com/Basicprogrammer10"));
    }
}