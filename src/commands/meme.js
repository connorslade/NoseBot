const common = require('./../common.js');
const https = require('https');

module.exports = {
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
                msg.channel.send(common.embedMessage(color.nose, `𝓜 𝓔 𝓜 𝓔 ${(jsonResponse['nsfw']) ? '[NSFW]' : ''}`, `**Title:** ${jsonResponse['title']}\n**Author:** ${jsonResponse['author']}\n**UpVotes:** ${common.numberWithCommas(jsonResponse['ups'])}`).setImage(jsonResponse['url']).setURL(jsonResponse['postLink']));
            });
        });
    }
}