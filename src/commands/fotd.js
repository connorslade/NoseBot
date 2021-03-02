const common = require('./../common.js');
const fs = require("fs");

module.exports = {
    "help": common.embedMessage(color.help, 'Help: FOTD', 'Sends you a Random Fact! :grin:\nUsage: `$fotd`'),
    "usage": 'fotd',
    process: function (msg) {
        function doCommand() {
            let randomFact = Math.floor(Math.random() * (global.facts.length - 1) + 1);
            msg.channel.send(common.embedMessage(color.main, `FOTD :factory: [${randomFact}]`, '**Fact of that day!!!**\n```' + global.facts[randomFact] + '```'));
        }

        if (typeof (global.facts) !== 'undefined' && global.facts) {
            doCommand();
        } else {
            global.facts = JSON.parse(fs.readFileSync('./assets/facts.json', 'utf8'));
            doCommand();
        }
    }
}