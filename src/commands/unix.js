const common = require('./../common.js');
const fs = require("fs");

module.exports = {
    "help": 'Gives Information on unix Commands',
    "usage": 'unix [commandName]',
    process: function (msg, command) {
        function doCommand() {
            if (command.length === 1) {
                msg.channel.send(common.embedMessage(color.red, "Unix Commands", "Use `$unix [commandName]` to get info on a UNIX command.\nAll commands from: https://wikipedia.org/wiki/List_of_Unix_commands"));
            } else if (unixCommands.hasOwnProperty(command[1].toLowerCase())) {
                let infoOnCommand = command[1].toLowerCase();
                let commandInfo = unixCommands[infoOnCommand];
                msg.channel.send(common.embedMessage(color.main, "Unix Command: `" + infoOnCommand + "`", `**${commandInfo.description}**\n\`\`\`Category: ${commandInfo.category}\nStatus: ${commandInfo.status}\`\`\``));
            } else {
                msg.channel.send(common.embedMessage(color.red, "Unknown Command...", "This is not a valid UNIX command...\nTry running `$unix` to see all unix commands!"));
            }
        }

        if (typeof (global.unixCommands) !== 'undefined' && global.unixCommands) {
            doCommand();
            return;
        }
        global.unixCommands = JSON.parse(fs.readFileSync('./assets/unixCommands.json', 'utf8'));
        doCommand();
    }
}