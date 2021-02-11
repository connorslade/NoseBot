const { magneticConstantDependencies, max, min } = require("mathjs");
const common = require('./common.js');

const Discord = require("discord.js");
const fs = require("fs");

const https = require('https');
const math = require('mathjs');

module.exports = {
    "commands": {
        "among-us": {
            "help": common.embedMessage(color.help, 'Help: among-us', 'Sends among us server code\nUsage: `$among-us <code>`'),
            "usage": 'among-us <code>',
            process: function (msg, command) {
                if (command.length > 1) {
                    let working = msg.content.split(commandPrefix + 'among-us ')[1];
                    msg.channel.send(common.embedMessage("#FFDF1E", 'Among Us Code', 'Join Among Us now!\n**Code:** `' + working + '`').setThumbnail("https://i.imgur.com/wraEjgu.jpg").setFooter(common.getFormatDT()));
                } else {
                    msg.channel.send(common.embedMessage(color.red, 'Error', 'No code Supplied\nUsage: `$among-us <code>`'));
                }
            }
        },
        "bugreport": {
            "help": common.embedMessage(color.help, 'Help: Bugreport', 'Reports a Bug\nUsage: `$bugreport <text>`'),
            "usage": 'bugreport <text>',
            process: function (msg, command) {
                if (command.length > 1) {
                    let working = msg.content.split(commandPrefix + 'bugreport ')[1];
                    msg.channel.send(common.embedMessage(color.main, 'Bugreport :bug:', 'Bug has been Reported!\n`' + working + '`'));
                } else {
                    msg.channel.send(common.embedMessage(color.red, 'Error', 'No text Supplied'));
                }
            }
        },
        "calc": {
            "help": common.embedMessage(color.help, 'Help: Calc', 'Does Math\nUsage: `$calc <math>`'),
            "usage": 'calc <math>',
            process: function (msg, command) {
                try {
                    msg.channel.send(common.embedMessage(color.main, 'Math', 'Input: `' + command[1] + '`\nResult: `' + math.evaluate(command[1]) + '`'));
                }
                catch (e) {
                    msg.channel.send(common.embedMessage(color.red, 'Error', e));
                }
            }
        },
        "coinflip": {
            "help": common.embedMessage(color.help, 'Help: CoinFlip', 'Flips a Coin...\nUsage: `$coinflip`'),
            "usage": 'coinflip',
            process: function (msg, command) {
                if (Math.random() <= 0.5) {
                    msg.channel.send(common.embedMessage(color.main, 'Coinflip', ':coin: Heads'));
                } else {
                    msg.channel.send(common.embedMessage(color.main, 'Coinflip', ':coin: Tails'));
                }
            }
        },
        "fotd": {
            "help": common.embedMessage(color.help, 'Help: FOTD', 'Sends you a Random Fact! :grin:\nUsage: `$fotd`'),
            "usage": 'fotd',
            process: function (msg, command) {
                https.get('https://uselessfacts.jsph.pl/random.json?language=en', (response) => {
                let todo = '';

                response.on('data', (chunk) => {todo += chunk;});

                response.on('end', () => {msg.channel.send(common.embedMessage(color.main, 'FOTD :factory:', '**Fact of that day!!!**\n```' + JSON.parse(todo)['text'] + '```').setURL(JSON.parse(todo)['permalink']));});

                });
            }
        },
        "github": {
            "help": common.embedMessage(color.help, 'Help: Github', 'Sends you to the NoseBot Github\nUsage: `$github`'),
            "usage": 'github',
            process: function (msg, command) {
                msg.channel.send(common.embedMessage(color.main, 'Github :octopus:', '**NoseBot**\nhttps://github.com/Basicprogrammer10/NoseBot').setThumbnail('https://i.imgur.com/7dEMK3N.png'));
            }
        },
        "help": {
            "help": common.embedMessage(color.help, 'Help: Help', 'No explanation Needed...\nUsage: `$help [command]`'),
            "usage": 'help [command]',
            process: function (msg, command) {
                if (command.length > 1) {
                    try { msg.channel.send(module.exports.commands[command[1].toLowerCase()].help); }
                    catch { }
                }
                else {
                    working = '```\n';
                    numCommands = 0;
                    for (i in Object.keys(module.exports.commands)) {
                        if (module.exports.commands[Object.keys(module.exports.commands)[i]]['usage'] !== undefined) {
                            working += commandPrefix + module.exports.commands[Object.keys(module.exports.commands)[i]]['usage'] + '\n'
                            numCommands += 1;
                        }
                    }
                    working += '```';
                    msg.channel.send(common.embedMessage(color.main, 'Commands [' + numCommands.toString() + ']', working));
                }
            }
        },
        "invite": {
            "help": common.embedMessage(color.help, 'Help: Invite', 'Creates a invite for the server\nUsage: `$invite`'),
            "usage": 'invite',
            process: function (msg, command) {
                msg.channel.createInvite({ unique: false }).then(invite => { msg.channel.send(common.embedMessage(color.main, 'Invite', "https://discord.gg/" + invite.code)) });
            }
        },
        "minecraft": {
            "help": common.embedMessage(color.help, 'Help: minecraft', 'Sends Minecraft Server Info\nUsage: `$minecraft <URL>`'),
            "usage": 'minecraft <URL>',
            process: function (msg, command) {
                if (command.length > 1) {
                    let working = msg.content.split(commandPrefix + 'minecraft ')[1];
                    https.get('https://api.mcsrvstat.us/2/' + working, (response) => {
                        let todo = '';

                        response.on('data', (chunk) => {todo += chunk;});

                        response.on('end', () => {
                            let jsonResponse = JSON.parse(todo);
                            if (jsonResponse.online){
                                let text = `**URL:** \`${working}\`\n**MOTD:** \`${(jsonResponse['motd'].clean[0]).replace(/\s+/g, ' ')}\`\n**Online:** \`${jsonResponse['players']['online']}\`/\`${jsonResponse['players']['max']}\`\n**IP:** \`${jsonResponse['ip']}${(':'+jsonResponse['port']).replace(':25565','')}\``;
                                const attachment = new Discord.MessageAttachment(common.base64ToPng(jsonResponse.icon, '.tmp.png'), 'tmp.png');
                                msg.channel.send(common.embedMessage(color.minecraft, 'Minecraft Server :video_game: ' + working, text).setURL('https://mcsrvstat.us/server/'+working).attachFiles(attachment).setThumbnail("attachment://tmp.png").setFooter(common.getFormatDT()));
                            }else {
                                let text = `**URL:** \`${working}\`\n**OFFLINE**`;
                                msg.channel.send(common.embedMessage(color.minecraft, 'Minecraft Server :video_game: ' + working, text).setURL('https://mcsrvstat.us/server/'+working).setThumbnail("https://i.imgur.com/CT4tVWf.png").setFooter(common.getFormatDT()));
                            }
                        });
                    });

                } else {
                    msg.channel.send(common.embedMessage(color.red, 'Error', 'No URL Supplied\nUsage: `$minecraft <URL>`'));
                }
            }
        },
        "nose": {
            "help": common.embedMessage(color.help, 'Help: Nose', 'Noses You!\nUsage: `$nose`'),
            "usage": 'nose',
            process: function (msg, command) {
                x = Math.floor((Math.random() * 89) + 1);
                noseUrl = 'https://connorcode.com/Main_Assets/Noses/' + x + '.jpg'
                msg.channel.send(common.embedMessage(color.nose, "Nose! :dog:", "").setImage(noseUrl));
            }
        },
        "ping": {
            "help": common.embedMessage(color.help, 'Help: Ping', 'Get the ping\nUsage: `$ping`'),
            "usage": 'ping',
            process: function (msg, command) {
                let ping = Date.now() - msg.createdTimestamp;
                msg.channel.send(common.embedMessage(color.main, 'Ping', 'Ping: ' + ping.toString() + 'ms\nAPI:  ' + Math.round(client.ws.ping).toString() + 'ms'))
            }
        },
        "random": {
            "help": common.embedMessage(color.help, 'Help: Random', 'Generates random Numbers\nUsage: `$random <min> <max>`'),
            "usage": 'random <min> <max>',
            process: function (msg, command) {
                if (command.length === 3) {
                    msg.channel.send(common.embedMessage(color.main, 'Random ' + min(command[1], command[2]) + ' — ' +
                        max(command[1], command[2]), Math.floor(Math.random() * (max(command[1], command[2]) - min(command[1], command[2]) + 1) + min(command[1], command[2]))));
                } else {
                    msg.channel.send(common.embedMessage(color.main, 'Random 1 — 6', Math.floor(Math.random() * (6 - 1 + 1) + 1)));
                }
            }
        },
        "randomcolor" : {
            "help": common.embedMessage(color.help, 'Help: Random Color', 'Generates random color!\nUsage: `$randomcolor`'),
            "usage": 'randomcolor',
            process: function (msg, command) {
                let hexCode = common.rgbToHex(Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1);
                msg.channel.send(common.embedMessage(hexCode, 'Random Color :paintbrush:', `**HEX:** \`${hexCode}\``));
            }
        },
        "say": {
            "help": common.embedMessage(color.help, 'Help: Say', 'Says Stuff\nUsage: `$say <text>`'),
            "usage": 'say <text>',
            process: function (msg, command) {
                if (command.length > 1) {
                    working = '';
                    for (let i = 1; i < command.length; i++) {
                        working = working + ' ' + command[i]
                    }
                    if (working.length > 1) {
                        msg.channel.send(working);
                    } else {
                        msg.channel.send(common.embedMessage(color.red, 'Error', 'I cant run my own commands :joy:'));
                    }
                } else {
                    msg.channel.send(common.embedMessage(color.red, 'Error', 'No text Supplied'));
                }
            }
        },
        "uptime": {
            "help": common.embedMessage(color.help, 'Help: Uptime', 'Gives Bot Uptime\nUsage: `$uptime`'),
            "usage": 'uptime',
            process: function (msg, command) {
                msg.channel.send(common.embedMessage(color.main, 'Uptime', 'Uptime: ' + common.msToTime(client.uptime)));
            }
        },
        "render": {
            "help": common.embedMessage(color.help, 'Help: Render', 'Gives link to render of cords\nUsage: `$render <x> <z> [DimensionID]`\n0 - Overworld  |  1 - End'),
            "usage": 'render <x> <z> [DimensionID]',
            process: function (msg, command) {
                if (command.length === 3) {
                    msg.channel.send(common.embedMessage(color.link, 'Render x' + command[1] + ' z' + command[2] + '[overworld-isometric]', 'https://elite-anarchy.connorcode.com/#overworld-isometric/0/4/' + command[1] + '/' + command[2] + '/64'))
                } else if (command.length === 4) {
                    dimID = { 0: 'overworld-isometric', 1: 'end-isometric' };
                    msg.channel.send(common.embedMessage(color.link, 'Render x' + command[1] + ' z' + command[2] + ' [' + dimID[Number(command[3])] + ']', 'https://elite-anarchy.connorcode.com/#' + dimID[Number(command[3])] + '/0/6/' + command[1] + '/' + command[2] + '/64'))
                }
                else {
                    msg.channel.send(common.embedMessage(color.link, 'Render x0 z0', 'https://elite-anarchy.connorcode.com/#overworld-isometric/0/4/0/0/64'))
                }
            }
        },
        "version": {
            "help": common.embedMessage(color.help, 'Help: Version', 'Gives Version Info\nUsage: `$version`'),
            "usage": 'version',
            process: function (msg, command) {
                msg.channel.send(common.embedMessage(color.main, "Version", 'Version: ' + version + '\n Created by Sigma76\nDiscord: Sigma#8214').setThumbnail('https://i.imgur.com/Fyv02Qd.png').setURL("https://github.com/Basicprogrammer10"));
            }
        },
        "eval": {
            "help": common.embedMessage(color.help, 'Help: Eval', 'Hidden Command for Kool Peeps only (AKA not you)'),
            process: function (msg, command) {
                if (msg.author.id === config.adminId || msg.author.id === "466967710685855744") {
                    let working = '';
                    for (i in command) {
                        working = working + command[i] + ' '
                    }
                    working = working.split('eval ')[1].slice(0, -1);
                    try {
                        msg.channel.send(common.embedMessage(color.main, "Eval", 'Code: `' + working + '`\n' + eval(working)));
                    } catch (e) {
                        msg.channel.send(common.embedMessage(color.red, 'Code: `' + working + '`\nError', e));
                    }
                } else {
                    msg.channel.send(common.embedMessage(color.red, 'Who do you think you are?!', 'No backdooring for you!'));
                }
            }
        }
    }
}