const common = require('./../common.js');
const fs = require("fs");

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Advice', 'Sends you Random Advice! :grin:\nUsage: `$advice`'),
    "usage": 'advice',
    process: function (msg) {
        function doCommand() {
            let randomAdvice = Math.floor(Math.random() * (global.advice.length - 1) + 1);
            msg.channel.send(common.embedMessage(color.main, `Advice :older_adult: [${randomAdvice}]`, '```' + global.advice[randomAdvice] + '```'));
        }

        if (typeof (global.advice) !== 'undefined' && global.advice) {
            doCommand();
        } else {
            global.advice = JSON.parse(fs.readFileSync('./assets/advice.json', 'utf8'));
            doCommand();
        }
    }
}