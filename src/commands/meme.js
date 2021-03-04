const common = require('./../common.js');
const https = require('https');

module.exports = {
    "help": 'Sends a **Relevant** Meme',
    "usage": 'meme [nsfw]',
    process: async function (msg) {

        let Loading = await msg.channel.send(common.embedMessage(color.link, `Loading a **Good MEME**...`, 'Hang Tight!'));

        https.get('https://meme-api.herokuapp.com/gimme', (response) => {
            let todo = '';
            response.on('data', (chunk) => {
                todo += chunk;
            });

            response.on('end', () => {
                let jsonResponse = JSON.parse(todo);
                Loading.edit(common.embedMessage(color.nose, `𝓜 𝓔 𝓜 𝓔 ${(jsonResponse['nsfw']) ? '[NSFW]' : ''}`, `**Title:** ${jsonResponse['title']}\n**Author:** ${jsonResponse['author']}\n**UpVotes:** ${common.numberWithCommas(jsonResponse['ups'])}`).setImage(jsonResponse['url']).setURL(jsonResponse['postLink']));
            });
        });
    }
}