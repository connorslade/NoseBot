const common = require('./../common.js');

module.exports = {
    //TODO: Get / Store Images On Bot Side?
    "help": 'Noses You!',
    "usage": 'nose',
    process: function (msg) {
        let x = Math.floor((Math.random() * 89) + 1);
        let noseUrl = 'https://connorcode.com/Main_Assets/Noses/' + x + '.jpg'
        msg.channel.send(common.embedMessage(color.nose, "Nose! :dog:", "").setImage(noseUrl));
    }
}