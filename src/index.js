const Discord = require('discord.js');
const common = require('./common.js');
const commandJS = require('./botCommands.js');

global.client = new Discord.Client();

client.on('ready', () => {
    console.log("\033[32mLogged in as \033[36m" + client.user.tag + "\033[0m");
    client.user.setActivity(config.activity).then(() => {
    });
});

client.on("message", async (msg) => {
    console.log('\033[32m' + `${msg['author']['username']}#${msg['author']['discriminator']}: ${msg.content}` + '\033[0m')

    let command = msg.content.replace(commandPrefix, '').split(' ');
    if (!msg.content.startsWith(commandPrefix)) {
        return;
    }
    if (!Object.keys(commandJS.commands).includes(command[0].toLowerCase())) {
        msg.channel.send(common.embedMessage(color.red, 'Error', `Unknown Command\nTry \`${commandPrefix}help\``));
        return;
    }
    try {
        commandJS.commands[command[0].toLowerCase()].process(msg, command);
    } catch (e) {
        msg.channel.send(common.embedMessage(color.red, 'Error', 'Please report this Bug to **Sigma#8214**\n`' + e + '`'));
    }
});

common.loadConfig('config.json');