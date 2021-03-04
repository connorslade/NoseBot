const common = require('./../common.js');
const fs = require("fs");

module.exports = {
    "help": common.embedMessage(color.help, 'Help: FOTD', 'Sends you a Random Fact! :grin:\nUsage: `$fotd`'),
    "usage": 'fotd',
    process: function (msg) {
        function doCommand() {
            let randomJoke = Math.floor(Math.random() * (global.jokes.length - 1) + 1);
            msg.channel.send(common.embedMessage(color.main, `Joke :joy: [${randomJoke}]`, `${global.jokes[randomJoke].setup}\n${global.jokes[randomJoke].punchline}`));
        }

        if (typeof (global.jokes) !== 'undefined' && global.facts) {
            doCommand();
        } else {
            global.jokes = JSON.parse(fs.readFileSync('./assets/jokes.json', 'utf8'));
            doCommand();
        }
    }
}