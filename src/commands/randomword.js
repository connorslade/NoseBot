const common = require('./../common.js');
const fs = require("fs");

module.exports = {
    "help": 'Generates random word!',
    "usage": 'randomword',
    process: function (msg) {
        function doCommand() {
            let index = common.getRandomInt(0, words.length - 1);
            let word = words[index];
            msg.channel.send(common.embedMessage(color.main, `Word [${index}]`, `${word}`));
        }

        if (typeof (global.words) !== 'undefined' && global.words) {
            doCommand();
            return;
        }
        global.words = JSON.parse(fs.readFileSync('./assets/words.json', 'utf8'));
        doCommand();
    }
}