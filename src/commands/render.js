const common = require('./../common.js');

module.exports = {
    "help": 'Gives link to render of cords',
    "usage": 'render <x> <z> [DimensionID]',
    process: function (msg, command) {
        let dimID;
        if (command.length === 3) {
            msg.channel.send(common.embedMessage(color.link, 'Render x' + command[1] + ' z' + command[2] + '[overworld-isometric]', 'https://elite-anarchy.connorcode.com/#overworld-isometric/0/4/' + command[1] + '/' + command[2] + '/64'))
        } else if (command.length === 4) {
            dimID = {0: 'overworld-isometric', 1: 'end-isometric'};
            msg.channel.send(common.embedMessage(color.link, 'Render x' + command[1] + ' z' + command[2] + ' [' + dimID[Number(command[3])] + ']', 'https://elite-anarchy.connorcode.com/#' + dimID[Number(command[3])] + '/0/6/' + command[1] + '/' + command[2] + '/64'))
        } else {
            msg.channel.send(common.embedMessage(color.link, 'Render x0 z0', 'https://elite-anarchy.connorcode.com/#overworld-isometric/0/4/0/0/64'))
        }
    }
}