const common = require('./../common.js');
const fs = require("fs");

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Random Word', 'Generates random word!\nUsage: `$randomword`'),
    "usage": 'randomword',
    process: function (msg, command) {
        function doCommand() {
            let index = common.getRandomInt(0, words.length - 1);
            let word = words[index];
            msg.channel.send(common.embedMessage(color.main, `Word [${index}]`, `${word}`));
        }

        if (typeof (global.words) !== 'undefined' && global.words) {
            doCommand();
        } else {
            global.words = JSON.parse(fs.readFileSync('./assets/words.json', 'utf8'));
            doCommand();
        }
    }
}