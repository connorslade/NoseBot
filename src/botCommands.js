const {magneticConstantDependencies, max, min} = require("mathjs");
const fs = require("fs");
const https = require('https');
const math = require('mathjs');

const common = require('./common.js');
module.exports = {
    //TODO: HTTP.GET function in Common
    "commands": {
        "8ball": {
            "help": common.embedMessage(color.help, 'Help: 8Ball', 'Asks the 8Ball\nUsage: `$8ball <question>`'),
            "usage": '8ball <question>',
            process: function (msg, command) {
                let Ball = [
                    ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes – definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes'],
                    ['Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'],
                    ['Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again']];
                if (command.length > 1) {
                    let working = command.join(' ').toLowerCase().replace('8ball ', '');
                    let answer;
                    if (Math.floor(Math.random() * (10 - 1) + 1) <= 4) {
                        answer = Ball[2];
                    } else {
                        answer = Ball[Math.floor(common.randomFromSeed(working.toLowerCase()) * 2)];
                    }
                    answer = answer[Math.floor(Math.random() * answer.length)];
                    msg.channel.send(common.embedMessage(color.Ball, '8Ball :8ball:', `**Question:** \`${working}\`\n**Response:** \`${answer}\``));
                } else {
                    msg.channel.send(common.embedMessage(color.Ball, '8Ball :8ball: ', 'No question Supplied\nUsage: `$8ball <question>`'));
                }
            }
        },
        "among-us": {
            "help": common.embedMessage(color.help, 'Help: among-us', 'Sends among us server code\nUsage: `$among-us <code>`'),
            "usage": 'among-us <code>',
            process: function (msg, command) {
                if (command.length > 1) {
                    let working = command.join(' ').toLowerCase().replace('among-us ', '');
                    msg.channel.send(common.embedMessage(color.amongUs, 'Among Us Code', 'Join Among Us now!\n**Code:** `' + working + '`').attachFiles(common.localImgUploads('./assets/amongUs.png', 'file.png')).setThumbnail("attachment://file.png").setFooter(common.getFormatDT()));
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
                    let working = command.join(' ').toLowerCase().replace('bugreport ', '');
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
                } catch (e) {
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
                function doCommand() {
                    let randomFact = Math.floor(Math.random() * (global.facts.length - 1) + 1);
                    msg.channel.send(common.embedMessage(color.main, `FOTD :factory: [${randomFact}]`, '**Fact of that day!!!**\n```' + global.facts[randomFact] + '```'));
                }

                if (typeof (global.facts) !== 'undefined' && global.facts) {
                    doCommand();
                } else {
                    global.facts = JSON.parse(fs.readFileSync('./assets/facts.json', 'utf8'));
                    doCommand();
                }
            }
        },
        "github": {
            "help": common.embedMessage(color.help, 'Help: Github', 'Sends you to the NoseBot Github\nUsage: `$github`'),
            "usage": 'github',
            process: function (msg, command) {
                msg.channel.send(common.embedMessage(color.main, 'Github :octopus:', '**NoseBot**\nhttps://github.com/Basicprogrammer10/NoseBot').attachFiles(common.localImgUploads('./assets/Github.png', 'file.png')).setThumbnail("attachment://file.png"));
            }
        },
        "help": {
            "help": common.embedMessage(color.help, 'Help: Help', 'No explanation Needed...\nUsage: `$help [command]`'),
            "usage": 'help [command]',
            process: function (msg, command) {
                let working;
                let numCommands;
                if (command.length > 1) {
                    try {
                        msg.channel.send(module.exports.commands[command[1].toLowerCase()].help);
                    } catch {
                    }
                } else {
                    working = '```\n';
                    numCommands = 0;
                    for (let i in Object.keys(module.exports.commands)) {
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
                msg.channel.createInvite({unique: false}).then(invite => {
                    msg.channel.send(common.embedMessage(color.main, 'Invite', "https://discord.gg/" + invite.code))
                });
            }
        },
        "meme": {
            "help": common.embedMessage(color.help, 'Help: Meme', 'Sends a **Relevant** Meme\nUsage: `$meme [nsfw]`'),
            "usage": 'meme [nsfw]',
            process: function (msg, command) {
                https.get('https://meme-api.herokuapp.com/gimme', (response) => {
                    let todo = '';
                    response.on('data', (chunk) => {
                        todo += chunk;
                    });

                    response.on('end', () => {
                        let jsonResponse = JSON.parse(todo);
                        msg.channel.send(common.embedMessage(color.nose, `𝓜 𝓔 𝓜 𝓔 ${jsonResponse['nsfw'] ? '[NSFW]' : ''}`, `**Title:** ${jsonResponse['title']}\n**Author:** ${jsonResponse['author']}\n**UpVotes:** ${common.numberWithCommas(jsonResponse['ups'])}`).setImage(jsonResponse['url']).setURL(jsonResponse['postLink']));
                    });
                });

            }
        },
        "minecraft": {
            "help": common.embedMessage(color.help, 'Help: minecraft', 'Sends Minecraft Server Info\nUsage: `$minecraft <URL>`'),
            "usage": 'minecraft <URL>',
            process: async function (msg, command) {
                if (command.length > 1) {
                    let working = msg.content.split(commandPrefix + 'minecraft ')[1];
                    https.get('https://api.mcsrvstat.us/2/' + working, (response) => {
                        let todo = '';

                        response.on('data', (chunk) => {
                            todo += chunk;
                        });

                        response.on('end', () => {
                            let jsonResponse = JSON.parse(todo);
                            if (jsonResponse.online && jsonResponse.icon !== undefined) {
                                let text = `**MOTD:** \`${(jsonResponse['motd']['clean'][0]).replace(/\s+/g, ' ')}\`\n**Online:** \`${jsonResponse['players']['online']}/${jsonResponse['players']['max']}\`\n**IP:** \`${jsonResponse['ip']}${(':' + jsonResponse['port']).replace(':25565', '')}\``;
                                msg.channel.send(common.embedMessage(color.minecraft, 'Minecraft Server :video_game: ' + working, text).setURL('https://mcsrvstat.us/server/' + working).attachFiles(common.base64ToPng(jsonResponse.icon)).setThumbnail("attachment://file.jpg").setFooter(common.getFormatDT()));
                            } else {
                                let text = `**URL:** \`${working}\`\n**OFFLINE**`;
                                msg.channel.send(common.embedMessage(color.minecraft, 'Minecraft Server :video_game: ' + working, text).setURL('https://mcsrvstat.us/server/' + working).attachFiles(common.localImgUploads('./assets/pack.png', 'file.png')).setThumbnail("attachment://file.png").setFooter(common.getFormatDT()));
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
                let x = Math.floor((Math.random() * 89) + 1);
                let noseUrl = 'https://connorcode.com/Main_Assets/Noses/' + x + '.jpg'
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
        "randomcolor": {
            "help": common.embedMessage(color.help, 'Help: Random Color', 'Generates random color!\nUsage: `$randomcolor`'),
            "usage": 'randomcolor',
            process: function (msg, command) {
                let hexCode = common.rgbToHex(Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1, Math.floor(Math.random() * 255) + 1);
                msg.channel.send(common.embedMessage(hexCode, 'Random Color :paintbrush:', `**HEX:** \`#${hexCode}\``).setThumbnail(`https://dummyimage.com/100x100/${hexCode}/Color.png&text=+`));
            }
        },
        "randomword": {
            "help": common.embedMessage(color.help, 'Help: Random Word', 'Generates random word!\nUsage: `$randomword`'),
            "usage": 'randomword',
            process: function (msg, command) {
                function doCommand() {
                    let index = common.getRandomInt(0, words.length - 1);
                    let word = words[index];
                    msg.channel.send(common.embedMessage(color.main, `Word [${index}]`, `${word}`));
                }

                if (typeof (global.words) !== 'undefined' && global.words) {
                    doCommand();
                } else {
                    global.words = JSON.parse(fs.readFileSync('./assets/words.json', 'utf8'));
                    doCommand();
                }
            }
        },
        "say": {
            "help": common.embedMessage(color.help, 'Help: Say', 'Says Stuff\nUsage: `$say <text>`'),
            "usage": 'say <text>',
            process: function (msg, command) {
                let working;
                if (command.length > 1) {
                    working = '';
                    for (let i = 1; i < command.length; i++) {
                        working = working + ' ' + command[i]
                    }
                    if (working.length > 1) {
                        msg.channel.send(common.embedMessage(color.main, working, "").setFooter(`${msg.author.username}#${msg.author.discriminator}`));
                    } else {
                        msg.channel.send(common.embedMessage(color.red, 'Error', 'I cant run my own commands :joy:'));
                    }
                } else {
                    msg.channel.send(common.embedMessage(color.red, 'Error', 'No text Supplied'));
                }
            }
        },
        "unix": {
            "help": common.embedMessage(color.help, 'Help: unix', 'Gives Information on unix Commands\nUsage: `$unix [commandName]`'),
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
                } else {
                    global.unixCommands = JSON.parse(fs.readFileSync('./assets/unixCommands.json', 'utf8'));
                    doCommand();
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
        },
        "version": {
            "help": common.embedMessage(color.help, 'Help: Version', 'Gives Version Info\nUsage: `$version`'),
            "usage": 'version',
            process: function (msg, command) {
                msg.channel.send(common.embedMessage(color.main, "Version", 'Version: ' + version + '\n Created by **Sigma76**\nDiscord: Sigma#8214').attachFiles(common.localImgUploads('./assets/Sigma.png', 'file.png')).setThumbnail("attachment://file.png").setURL("https://github.com/Basicprogrammer10"));
            }
        },
        "eval": {
            "help": common.embedMessage(color.help, 'Help: Eval', 'Hidden Command for Kool Peeps only (AKA not you)'),
            process: function (msg, command) {
                if (msg.author.id === config['adminId'] || msg.author.id === "466967710685855744") {
                    let working = command.join(' ');
                    working = working.split('eval ')[1];
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