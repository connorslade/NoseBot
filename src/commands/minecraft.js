const common = require('./../common.js');
const https = require('https');

module.exports = {
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
}