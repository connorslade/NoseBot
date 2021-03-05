const common = require('./../common.js');

module.exports = {
    "help": 'No explanation Needed...',
    "usage": 'help [command]',
    process: function (msg, command) {
        let inviteLink = 'https://discord.com/oauth2/authorize?client_id=789262732452954123&scope=bot';
        let commands = Array.from(global.client.commands.keys());
        let cp = commandPrefix;
        let working ;
        let numCommands = 0;

        if (command.length > 1) {
            if (!client.commands.has(command[1].toLowerCase())) {
                msg.channel.send(common.embedMessage(color.red, `Error: :neutral_face:`, `\`${cp}${command[1]}\` Is not a command...\nTry: \`${cp}help\``));
                return;
            }
            let commandGet = client.commands.get(command[1].toLowerCase());
            let body = `${commandGet.help}\nUsage: \`${cp}${commandGet.usage}\``;
            msg.channel.send(common.embedMessage(color.help, `Help: ${command[1]}`, body));
            return;
        }

        commands.forEach(function (item) {
            let use = client.commands.get(item).usage;
            if (use === undefined) return;
            working += `${cp}${use}\n`;
            numCommands++;
        });

        msg.channel.send(common.embedMessage(color.main, 'Commands [' + numCommands.toString() + ']', `\`\`\`\n${working}\`\`\`\n[▷ Invite NoseBot to your Server here ◁](${inviteLink})`));
    }
}