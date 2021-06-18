const common = require('./../common.js');
const https = require('https');

module.exports = {
    "help": 'Hey, Nosebot... u good?',
    "usage": 'ugood',
    process: async function (msg, command) {
        if (global.crashes === 0) {
            msg.channel.send(common.embedMessage(color.main, 'Im good.', 'No need to worry bout me!'));
            return;
        }
        msg.channel.send(common.embedMessage(color.red, ':bug: Been Bettor :/', `Ive had \`${global.crashes}\` exceptions handled this session...`));
    }
}