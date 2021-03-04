const common = require('./../common.js');

module.exports = {
    "help": 'Generates random color!',
    "usage": 'randomcolor',
    process: function (msg) {
        let hexCode = common.rgbToHex(Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1);
        msg.channel.send(common.embedMessage(hexCode, 'Random Color :paintbrush:', `**HEX:** \`#${hexCode}\``).setThumbnail(`https://dummyimage.com/100x100/${hexCode}/Color.png&text=+`));
    }
}