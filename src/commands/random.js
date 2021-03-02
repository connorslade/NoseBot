const common = require('./../common.js');
const {magneticConstantDependencies, max, min} = require("mathjs");

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Random', 'Generates random Numbers\nUsage: `$random <min> <max>`'),
    "usage": 'random <min> <max>',
    process: function (msg, command) {
        if (command.length === 3) {
            msg.channel.send(common.embedMessage(color.main, 'Random :game_die: ' + min(command[1], command[2]) + ' — ' +
                max(command[1], command[2]), Math.floor(Math.random() * (max(command[1], command[2]) - min(command[1], command[2]) + 1) + min(command[1], command[2]))));
        } else {
            msg.channel.send(common.embedMessage(color.main, 'Random :game_die: 1 — 6', Math.floor(Math.random() * (6 - 1 + 1) + 1)));
        }
    }
}