const common = require('./../common.js');

module.exports = {
    "help": common.embedMessage(color.help, 'Help: Help', 'No explanation Needed...\nUsage: `$help [command]`'),
    "usage": 'help [command]',
    process: function (msg, command) {
        let commands = Array.from(global.client.commands.keys());
        let working;
        let numCommands = 0;

        if (command.length > 1) {
            msg.channel.send(client.commands.get(command[1].toLowerCase()).help);
            return
        }
        working = '```\n';

        commands.forEach(function (item) {
            let use = client.commands.get(item).usage;
            if (use === undefined) return;
            working += `${commandPrefix}${use}\n`;
            numCommands++;
        });

        working += '```';
        msg.channel.send(common.embedMessage(color.main, 'Commands [' + numCommands.toString() + ']', working));
    }
}