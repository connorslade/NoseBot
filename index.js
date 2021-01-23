color = { "main": "#2fc290", "help": "#E8DD4D", "red":"#DB5953", "link":"#27E2E8"};
commandPrefix = "$";
version = "0.0.24";

const Discord = require("discord.js");
const math = require('mathjs');
const fs = require("fs");
const { magneticConstantDependencies, max, min } = require("mathjs");
const client = new Discord.Client();
const commands = {
    "among-us": {
        "help": embedMessage(color.help, 'Help: among-us', 'Sends among us server code\nUsage: `$among-us <code>`'),
        "usage": 'among-us <code>',
        process: function (msg, command) {
            if (command.length > 1) {
                var working = msg.content.split(commandPrefix+'among-us ')[1];
                msg.channel.send(embedMessage("#FFDF1E", 'Among Us Code', 'Join Among Us now!\n**Code:** `'+working+'`').setThumbnail("https://i.imgur.com/wraEjgu.jpg").setFooter(getFormatDT()));
            }else {
                msg.channel.send(embedMessage(color.red, 'Error', 'No code Supplied\nUsage: `$among-us <code>`'));
            }
        }
    },
    "bugreport": {
        "help": embedMessage(color.help, 'Help: Bugreport', 'Reports a Bug\nUsage: `$bugreport <text>`'),
        "usage": 'bugreport <text>',
        process: function (msg, command) {
            if (command.length > 1) {
                var working = msg.content.split(commandPrefix+'bugreport ')[1];
                msg.channel.send(embedMessage(color.main, 'Bugreport :bug:', 'Bug has been Reported!\n`' + working + '`'));
            }else {
                msg.channel.send(embedMessage(color.red, 'Error', 'No text Supplied'));
            }
        }
    },
    "calc":{
        "help": embedMessage(color.help, 'Help: Calc', 'Does Math\nUsage: `$calc <math>`'),
        "usage": 'calc <math>',
        process: function (msg, command) {
            try{
                msg.channel.send(embedMessage(color.main, 'Math', 'Input: `' + command[1] + '`\nResult: `' + math.evaluate(command[1]) + '`'));
            }
                catch (e) {
                    msg.channel.send(embedMessage(color.red, 'Error', e));
                }
        }
    },
    "coinflip": {
        "help": embedMessage(color.help, 'Help: CoinFlip', 'Flips a Coin...\nUsage: `$coinflip`'),
        "usage": 'coinflip',
        process: function (msg, command) {
            if (Math.random() <= 0.5) {
                msg.channel.send(embedMessage(color.main, 'Coinflip', ':coin: Heads'));
            }else {
                msg.channel.send(embedMessage(color.main, 'Coinflip', ':coin: Tails'));
            }
        }
    },
    "help": {
        "help": embedMessage(color.help, 'Help: Help', 'No explanation Needed...\nUsage: `$help [command]`'),
        "usage": 'help [command]',
        process: function (msg, command) {
            if (command.length > 1) {
                try { msg.channel.send(commands[command[1].toLowerCase()].help); }
                catch { }
            }
            else {
                working = '```\n';
                numCommands = 0;
                for (i in Object.keys(commands)) {
                    if (commands[Object.keys(commands)[i]]['usage'] != undefined) {
                        working += commandPrefix + commands[Object.keys(commands)[i]]['usage'] + '\n'
                        numCommands += 1;
                    }
                }
                working += '```';
                msg.channel.send(embedMessage(color.main, 'Commands [' + numCommands.toString() + ']', working));
            }
        }
    },
    "invite": {
        "help": embedMessage(color.help, 'Help: Invite', 'Creates a invite for the server\nUsage: `$invite`'),
        "usage": 'invite',
        process: function (msg, command) {
            msg.channel.createInvite({unique: false}).then(invite => {msg.channel.send(embedMessage(color.main, 'Invite', "https://discord.gg/" + invite.code))});
        }
    },
    "minecraft":{
        "help": embedMessage(color.help, 'Help: minecraft', 'Sends Minecraft Server URL\nUsage: `$minecraft <URL>`'),
        "usage": 'minecraft <URL>',
        process: function (msg, command) {
            if (command.length > 1) {
                var working = msg.content.split(commandPrefix+'minecraft ')[1];
                msg.channel.send(embedMessage("#6ba940", 'Minecraft URL', 'Join Minecraft now!\n**URL:** `'+working+'`').setThumbnail("https://i.imgur.com/CT4tVWf.png").setFooter(getFormatDT()));
            }else {
                msg.channel.send(embedMessage(color.red, 'Error', 'No URL Supplied\nUsage: `$minecraft <URL>`'));
            }
        }
    },
    "nose":{
        "help": embedMessage(color.help, 'Help: Nose', 'Noses You!\nUsage: `$nose`'),
        "usage": 'nose',
        process: function (msg, command) {
            msg.reply('Nose!');
            x = Math.floor((Math.random() * 89) + 1);
            msg.reply('https://connorcode.com/Main_Assets/Noses/'+x+'.jpg');
        }
    },
    "ping": {
        "help": embedMessage(color.help, 'Help: Ping', 'Get the ping\nUsage: `$ping`'),
        "usage": 'ping',
        process: function (msg, command) {
            var ping = msg.createdTimestamp - Date.now();
            msg.channel.send(embedMessage(color.main, 'Ping', 'Ping: ' + ping.toString() + 'ms\nAPI:  '+Math.round(client.ws.ping).toString()+'ms'))
        }
    },
    "random": {
        "help": embedMessage(color.help, 'Help: Random', 'Generates random Numbers\nUsage: `$random <min> <max>`'),
        "usage": 'random <min> <max>',
        process: function (msg, command) {
            if (command.length === 3){
                msg.channel.send(embedMessage(color.main, 'Random ' + min(command[1],command[2]) + ' — ' + 
                max(command[1],command[2]), Math.floor(Math.random() * (max(command[1],command[2]) - min(command[1],command[2]) + 1) + min(command[1],command[2]))));
        }else{
            msg.channel.send(embedMessage(color.main, 'Random 1 — 6', Math.floor(Math.random() * (6 - 1 + 1) + 1)));
        }
    }
    },
    "say":{
        "help": embedMessage(color.help, 'Help: Say', 'Says Stuff\nUsage: `$say <text>`'),
        "usage": 'say <text>',
        process: function (msg, command) {
            if (command.length > 1) {
                working = '';
                for (var i = 1; i < command.length; i++) {
                    working = working + ' ' + command[i]
                }
                if (working.length > 1) {
                    msg.channel.send(working);
                }else {
                    msg.channel.send(embedMessage(color.red, 'Error', 'I cant run my own commands :joy:'));
                }
            }else {
                msg.channel.send(embedMessage(color.red, 'Error', 'No text Supplied'));
            }
        }
    },
    "uptime":{
        "help": embedMessage(color.help, 'Help: Uptime', 'Gives Bot Uptime\nUsage: `$uptime`'),
        "usage": 'uptime',
        process: function (msg, command) {
            msg.channel.send(embedMessage(color.main, 'Uptime', 'Uptime: ' + msToTime(client.uptime)));
        }
    },
    "render":{
        "help": embedMessage(color.help, 'Help: Render', 'Gives link to render of cords\nUsage: `$render <x> <z> [DimensionID]`\n0 - Overworld  |  1 - End'),
        "usage": 'render <x> <z> [DimensionID]',
        process: function (msg, command) {
            if (command.length === 3){
                msg.channel.send(embedMessage(color.link, 'Render x'+command[1]+' z'+command[2] + '[overworld-isometric]', 'https://elite-anarchy.connorcode.com/#overworld-isometric/0/4/'+command[1]+'/'+command[2]+'/64'))
            }else if (command.length === 4){
                dimID = {0:'overworld-isometric',1:'end-isometric'};
                msg.channel.send(embedMessage(color.link, 'Render x'+command[1]+' z'+command[2] + ' ['+dimID[Number(command[3])]+']', 'https://elite-anarchy.connorcode.com/#'+dimID[Number(command[3])]+'/0/6/'+command[1]+'/'+command[2]+'/64'))
            }
            else{
                msg.channel.send(embedMessage(color.link, 'Render x0 z0', 'https://elite-anarchy.connorcode.com/#overworld-isometric/0/4/0/0/64'))
            }
        }
    },
    "version": {
        "help": embedMessage(color.help, 'Help: Version', 'Gives Version Info\nUsage: `$version`'),
        "usage": 'version',
        process: function (msg, command) {
            msg.channel.send(embedMessage(color.main, "Version", 'Version: ' + version + '\n Created by Sigma76\nDiscord: Sigma#8214').setThumbnail('https://i.imgur.com/Fyv02Qd.png'));
        }
    },
    "eval": {
        "help": embedMessage(color.help, 'Help: Eval', 'Hidden Command for Kool Peeps only (AKA not you)'),
        process: function (msg, command) {
            if (msg.author.id == config.adminId) {
                var working = '';
                for (i in command){
                    working = working + command[i] + ' '
                }
                working = working.split('eval ')[1].slice(0, -1);
                try {
                    msg.channel.send(embedMessage(color.main, "Eval", 'Code: `' + working + '`\n'+eval(working)));
                }catch (e){
                    msg.channel.send(embedMessage(color.red, 'Code: `' + working + '`\nError', e));
                }
            }else{
                msg.channel.send(embedMessage(color.red, 'Who do you think you are?!', 'No backdooring for you!'));
            }
        }
    }
}


function embedMessage(embedColor, title, text) { return new Discord.MessageEmbed().setColor(embedColor).setTitle(title).setDescription(text) }

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function getFormatDT(){
    var currentdate = new Date(); 
    var datetime =  
    (currentdate.getMonth()+1) + "/"
    + currentdate.getDate() + "/" 
    + currentdate.getFullYear() + " — "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
    return datetime
}

function loadConfig(configFile) {
    fs.readFile(configFile, 'utf-8', (err, jsonString) => {
        global.config = JSON.parse(jsonString);
        client.login(config.clientId);
    });
}

client.on('ready', () => {
    console.log("\033[32mLogged in as \033[36m" + client.user.tag + "\033[0m");
    client.user.setActivity('$help');
});

client.on("message", async (msg) => {
    if (msg.content.charAt(0).toLowerCase() == commandPrefix) {
        console.log('\033[32m' + msg.author['username'] + '#' + msg.author['discriminator'] + ': ' + msg.content + '\033[0m')
        var command = msg.content.split(commandPrefix)[1].split(' ')
        if (Object.keys(commands).includes(command[0].toLowerCase())) {
            try{
                commands[command[0].toLowerCase()].process(msg, command);
            }catch (e){
                msg.channel.send(embedMessage(color.red, 'Error', 'Please report this Bug to **Sigma#8214**\n`'+e+'`'));
            }
        }else{
            msg.channel.send(embedMessage(color.red, 'Error', 'Unknown Command\nTry `$help`'));
        }
    }
});

loadConfig('config.json');