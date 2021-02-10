color = { "main": "#2fc290", "help": "#E8DD4D", "red":"#DB5953", "link":"#27E2E8", "nose":"#00EAFF", "minecraft":"#00FF6C"};

const Discord = require("discord.js");
const common = require('./common.js');
const commandJS = require('./botCommands.js');

global.client = new Discord.Client();

client.on('ready', () => {
    console.log("\033[32mLogged in as \033[36m" + client.user.tag + "\033[0m");
    client.user.setActivity(config.activity);
});

client.on("message", async (msg) => {
    if (msg.content.charAt(0).toLowerCase() === commandPrefix) {
        console.log('\033[32m' + msg['author']['username'] + '#' + msg['author']['discriminator'] + ': ' + msg.content + '\033[0m')
        let command = msg.content.split(commandPrefix)[1].split(' ');
        if (Object.keys(commandJS.commands).includes(command[0].toLowerCase())) {
            try{
                commandJS.commands[command[0].toLowerCase()].process(msg, command);
            }catch (e){
                msg.channel.send(common.embedMessage(color.red, 'Error', 'Please report this Bug to **Sigma#8214**\n`'+e+'`'));
            }
        }else{
            msg.channel.send(common.embedMessage(color.red, 'Error', 'Unknown Command\nTry `$help`'));
        }
    }
});

common.loadConfig('config.json');