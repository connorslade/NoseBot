const common = require('./../common.js');
const https = require('https');

module.exports = {
    "help": 'Sends you DuckDuckGo Instant Answer! :grin:',
    "usage": 'ia [question]',
    process: async function (msg, command) {
        let working = command.join(' ');
        working = working.split('ia ')[1];

        if (working === undefined) {
            msg.channel.send(common.embedMessage(color.red, 'Error', 'No question Supplied...\nUsage: `$ia [question]`'));
            return;
        }

        let Loading = await msg.channel.send(common.embedMessage(color.link, `Loading Instant Answer...`, 'Hang Tight!'));

        https.get(`https://api.duckduckgo.com/?q=${encodeURI(working)}&format=json&pretty=1&atb=v214-1`, (response) => {
            let todo = '';
            response.on('data', (chunk) => {
                todo += chunk;
            });

            response.on('end', () => {
                let jsonResponse = JSON.parse(todo);
                if (jsonResponse['Abstract'] === "" && jsonResponse['RelatedTopics'][0] === undefined) {
                    Loading.edit(common.embedMessage(color.red, `**Search:** ${jsonResponse['Heading']}`, `No Instant Answer for ${working}`));
                    return;
                }

                if (!(jsonResponse['Abstract'] === "")) {
                    let contents = jsonResponse['Infobox']['content'];
                    let footerContent = (contents !== undefined) ? `${contents[0]['label']} — ${contents[0]['value']}\n${contents[1]['label']} — ${contents[1]['value']}\n${contents[2]['label']} — ${contents[2]['value']}` : '';
                    let bodyContent = `\`\`\`${jsonResponse['AbstractText'].split('.').slice(0, 3).join('.')}...\`\`\``;
                    Loading.edit(common.embedMessage(color.nose, `**Search:** ${jsonResponse['Heading']}`, bodyContent).setURL(jsonResponse['AbstractURL']).setFooter(footerContent));
                    return;
                }

                if (!(jsonResponse['RelatedTopics'][0] === undefined)) {
                    let bodyContent = `\`\`\`${jsonResponse['RelatedTopics'][0]['Text']}\`\`\``;
                    if (jsonResponse['RelatedTopics'][0]['Icon']['URL'] === "") {
                        Loading.edit(common.embedMessage(color.nose, `**Search:** ${jsonResponse['Heading']}`, bodyContent).setURL(jsonResponse['AbstractURL']));
                        return;
                    }
                    Loading.edit(common.embedMessage(color.nose, `**Search:** ${jsonResponse['Heading']}`, bodyContent).setURL(jsonResponse['AbstractURL']).setImage(`https://api.duckduckgo.com/${jsonResponse['RelatedTopics'][0]['Icon']['URL']}`));
                }

            });
        });
    }
}